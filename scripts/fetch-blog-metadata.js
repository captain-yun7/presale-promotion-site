const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * 블로그 링크에서 OpenGraph 메타데이터를 가져와 JSON 파일을 업데이트하는 스크립트
 * 네이버 블로그 이미지를 다운로드해서 로컬에 저장
 */

/**
 * 이미지 다운로드 및 로컬 저장
 */
async function downloadImage(imageUrl, blogUrl) {
  try {
    // 이미지가 이미 로컬 경로인 경우 그대로 반환
    if (imageUrl.startsWith('/images/')) {
      return imageUrl;
    }

    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': blogUrl  // 네이버 Referrer 정책 우회
      }
    });

    if (!response.ok) {
      throw new Error(`Image download failed: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();

    // 이미지 URL에서 확장자 추출
    let ext = '.jpg';
    const urlExt = imageUrl.match(/\.(jpg|jpeg|png|gif|webp)/i);
    if (urlExt) {
      ext = urlExt[0].toLowerCase();
    }

    // 고유한 파일명 생성 (URL 해시 + 타임스탬프)
    const hash = crypto.createHash('md5').update(imageUrl).digest('hex').substring(0, 8);
    const timestamp = Date.now();
    const filename = `blog-${hash}-${timestamp}${ext}`;

    // public/images/blog 디렉토리 생성
    const blogImagesDir = path.join(__dirname, '../public/images/blog');
    if (!fs.existsSync(blogImagesDir)) {
      fs.mkdirSync(blogImagesDir, { recursive: true });
    }

    // 이미지 파일 저장
    const filepath = path.join(blogImagesDir, filename);
    fs.writeFileSync(filepath, Buffer.from(buffer));

    // 상대 경로 반환
    return `/images/blog/${filename}`;
  } catch (error) {
    console.error(`  ⚠️  이미지 다운로드 실패: ${error.message}`);
    return '/images/blog-placeholder.jpg';  // 실패 시 플레이스홀더 반환
  }
}

async function fetchOpenGraphData(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();

    // OpenGraph 메타 태그 파싱
    const ogTitle = html.match(/<meta property="og:title" content="([^"]*)"/) ||
                    html.match(/<meta name="title" content="([^"]*)"/) ||
                    html.match(/<title>([^<]*)<\/title>/);

    const ogDescription = html.match(/<meta property="og:description" content="([^"]*)"/) ||
                          html.match(/<meta name="description" content="([^"]*)"/);

    const ogImage = html.match(/<meta property="og:image" content="([^"]*)"/) ||
                    html.match(/<meta name="image" content="([^"]*)"/);

    // 발행일 파싱 (여러 형식 지원)
    const ogDate = html.match(/<meta property="article:published_time" content="([^"]*)"/) ||
                   html.match(/<meta property="og:article:published_time" content="([^"]*)"/) ||
                   html.match(/<time[^>]*datetime="([^"]*)"/) ||
                   html.match(/<span class="se_publishDate[^>]*>(\d{4}\.\d{2}\.\d{2})/);

    let date = null;
    if (ogDate && ogDate[1]) {
      const dateStr = ogDate[1];
      // ISO 형식 또는 YYYY.MM.DD 형식을 YYYY-MM-DD로 변환
      if (dateStr.includes('T')) {
        // ISO 8601 형식 (2025-01-13T...)
        date = dateStr.split('T')[0];
      } else if (dateStr.includes('.')) {
        // YYYY.MM.DD 형식
        date = dateStr.replace(/\./g, '-');
      } else if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
        // 이미 YYYY-MM-DD 형식
        date = dateStr;
      }
    }

    return {
      title: ogTitle ? ogTitle[1] : null,
      description: ogDescription ? ogDescription[1] : null,
      image: ogImage ? ogImage[1] : null,
      date: date
    };
  } catch (error) {
    console.error(`Error fetching ${url}:`, error.message);
    return null;
  }
}

async function updateBlogLinks() {
  const jsonPath = path.join(__dirname, '../data/blog-links.json');

  // JSON 파일 읽기
  const blogLinks = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  console.log('🔍 블로그 메타데이터 가져오는 중...\n');

  // 각 블로그 링크에 대해 메타데이터 가져오기
  const updatedLinks = [];

  for (let i = 0; i < blogLinks.length; i++) {
    const blog = blogLinks[i];
    console.log(`[${i + 1}/${blogLinks.length}] ${blog.url} 처리 중...`);

    const metadata = await fetchOpenGraphData(blog.url);

    if (metadata) {
      // 이미지가 있으면 다운로드
      let localImagePath = blog.image;
      if (metadata.image) {
        console.log(`  📥 이미지 다운로드 중...`);
        localImagePath = await downloadImage(metadata.image, blog.url);
        console.log(`  ✅ 이미지 저장: ${localImagePath}`);
      }

      const updatedBlog = {
        ...blog,
        title: metadata.title || blog.title,
        description: metadata.description || blog.description,
        image: localImagePath,
        date: metadata.date || blog.date
      };

      updatedLinks.push(updatedBlog);
      console.log(`  ✅ 제목: ${updatedBlog.title}`);
      console.log(`  ✅ 날짜: ${updatedBlog.date || '없음'}`);
    } else {
      // 메타데이터를 가져오지 못한 경우 원본 유지
      updatedLinks.push(blog);
      console.log(`  ⚠️  메타데이터를 가져올 수 없습니다. 원본 유지.`);
    }

    console.log('');

    // 네이버 서버에 부담을 주지 않도록 잠시 대기
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // JSON 파일 업데이트
  fs.writeFileSync(
    jsonPath,
    JSON.stringify(updatedLinks, null, 2),
    'utf8'
  );

  console.log('✨ blog-links.json 파일이 업데이트되었습니다!');
}

// 스크립트 실행
updateBlogLinks().catch(console.error);
