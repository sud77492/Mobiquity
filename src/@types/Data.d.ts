interface Src {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
   }
   interface Photo {
    id: number;
    width: number;
    height: number;
    url: string;
    photographer: string;
    photographer_url: string;
    photographer_id: number;
    avg_color: string;
    src: Src;
    liked: boolean;
    keyword: string;
   }
   interface Data {
    page: number;
    per_page: number;
    photos: Array < Photo > ;
    total_results: number;
    next_page: string;
   }