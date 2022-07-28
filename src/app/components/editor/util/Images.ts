
export interface Images {
  id: number,
  iconName: string
  alt: string
}

export enum EditorButtonMappings {
  HEADING,
  ITALIC,
  STRIKETHROUGH,
  BOLD,
  BULLET_LIST,
  NUMBER_LIST,
  CHECK_LIST,
  LINK,
  QUOTES,
  CODE,
  PHOTO
}

export const TEXT_BUTTONS = [
  {
    id: 0,
    iconName: "heading.png",
    alt: "heading"
  },
  {
    id: 1,
    iconName: "italic.png",
    alt: "italic"
  },
  {
    id: 2,
    iconName: "strikethrough.png",
    alt: "strikethrough"
  },
  {
    id: 3,
    iconName: "bold.png",
    alt: "bold"
  }
]

export const LIST_BUTTONS = [
  {
    id: 4,
    iconName: "bullet_list.png",
    alt: "bullet_list"
  },
  {
    id: 5,
    iconName: "number_list.png",
    alt: "number_list"
  },
  //Does not work with markdown library
  // {
  //   id: 6,
  //   iconName: "check_list.png",
  //   alt: "check_list"
  // }
]

export const OTHER_BUTTONS = [
  {
    id: 7,
    iconName: "link.png",
    alt: "link"
  },
  {
    id: 8,
    iconName: "quotes.png",
    alt: "quotes"
  },
  {
    id: 9,
    iconName: "code.png",
    alt: "code"
  },
  {
    id: 10,
    iconName: "photo.png",
    alt: "photo"
  }
]
