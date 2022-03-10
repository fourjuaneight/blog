// Shelf
export interface ShelfFields {
  name: string;
  creator: string;
  rating: number;
  cover: {
    id: string;
    width: number;
    height: number;
    url: string;
    filename: string;
    size: number;
    type: string;
    thumbnails: {
      small: {
        url: string;
        width: number;
        height: number;
      };
      large: {
        url: string;
        width: number;
        height: number;
      };
      full: {
        url: string;
        width: number;
        height: number;
      };
    };
  }[];
  category: string;
  genre: string;
  completed?: boolean;
  comments: string;
}

export interface ShelfRecord {
  id: string;
  fields: ShelfFields;
  createdTime: string;
}

export interface AirtableShelfResp {
  records: ShelfRecord[];
  offset: string;
}

export interface ShelfItem {
  name: string;
  creator: string;
  rating: number;
  cover: string;
  category: string;
  genre: string;
  completed: boolean;
  comments: string;
}
