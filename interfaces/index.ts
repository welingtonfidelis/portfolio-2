export interface CarouselImageInterface {
  visible: boolean;
  title: string;
  images: string[];
}

export interface ServicesInterface {
  image_url: string;
  company_name: string;
  position: string;
  start: string;
  end: string;
  description: string;
}

export interface ProjectsInterface {
  title: string;
  publication_url: string;
  github_url: string;
  images: string[];
}

export interface EducationInterface {
  title: string;
  institution: string;
  start: string;
  end: string;
}

export interface SkillInterface {
  title: string;
  date_start: string;
  date_end: string;
}

export interface InterestInterface {
  title: string;
}