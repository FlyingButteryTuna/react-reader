export type SubChapterData = {
  chapter_link: string;
  chapter_subtitle: string;
};

export type ChapterData = {
  chapter_title: string;
  subchapter_list: Array<SubChapterData>;
};

export type NovelData = {
  series_title: string;
  series_path: string;
  series_description: string;
  chapter_index: Array<ChapterData>;
};
