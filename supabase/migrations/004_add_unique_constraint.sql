-- project_contents에 unique constraint 추가 (upsert 지원)
ALTER TABLE project_contents
ADD CONSTRAINT project_contents_project_section_unique
UNIQUE (project_id, section_type);
