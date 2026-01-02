export interface Photo {
  id: string;
  src: string;
  aspectRatio?: "portrait" | "landscape" | "square";
  // For bento grid layout
  gridArea?: string;
  // For video support
  type?: "image" | "video";
}

export interface MonthData {
  id: string;
  name: string;
  shortName: string;
  photos: Photo[];
  layout?: "strip" | "bento";
}

export interface PumSection {
  date: string | null;
  images: string[];
}

export const MONTHS: MonthData[] = [
  {
    id: "january",
    name: "January",
    shortName: "JAN",
    layout: "bento",
    photos: [
      { id: "jan-1", src: "/photo/january/0.webp", gridArea: "a" },
      { id: "jan-2", src: "/photo/january/1.webp", gridArea: "b" },
      { id: "jan-3", src: "/photo/january/2.webp", gridArea: "c" },
      { id: "jan-4", src: "/photo/january/3.webp", gridArea: "d" },
      { id: "jan-5", src: "/photo/january/10.webp", gridArea: "e" },
      { id: "jan-6", src: "/photo/january/11.webp", gridArea: "f" },
    ],
  },
  {
    id: "february",
    name: "February",
    shortName: "FEB",
    layout: "bento",
    photos: [
      {
        id: "feb-1",
        src: "/photo/february/1.mp4",
        gridArea: "a",
        type: "video",
      },
      { id: "feb-2", src: "/photo/february/2.webp", gridArea: "b" },
      { id: "feb-3", src: "/photo/february/3.webp", gridArea: "c" },
      { id: "feb-4", src: "/photo/february/4.webp", gridArea: "d" },
      { id: "feb-5", src: "/photo/february/5.webp", gridArea: "e" },
      { id: "feb-6", src: "/photo/february/6.webp", gridArea: "f" },
    ],
  },
  {
    id: "march",
    name: "March",
    shortName: "MAR",
    layout: "bento",
    photos: [
      { id: "mar-1", src: "/photo/march/1.webp", gridArea: "a" },
      { id: "mar-2", src: "/photo/march/2.webp", gridArea: "b" },
      { id: "mar-3", src: "/photo/march/3.webp", gridArea: "c" },
      { id: "mar-4", src: "/photo/march/4.webp", gridArea: "d" },
      { id: "mar-5", src: "/photo/march/5.webp", gridArea: "e" },
      { id: "mar-6", src: "/photo/march/6.webp", gridArea: "f" },
    ],
  },
  {
    id: "april",
    name: "April",
    shortName: "APR",
    layout: "bento",
    photos: [
      { id: "apr-1", src: "/photo/april/3.webp", gridArea: "a" },
      { id: "apr-2", src: "/photo/april/10.webp", gridArea: "b" },
      { id: "apr-3", src: "/photo/april/2.webp", gridArea: "c" },
      { id: "apr-4", src: "/photo/april/6.webp", gridArea: "d" },
      { id: "apr-5", src: "/photo/april/5.webp", gridArea: "e" },
      { id: "apr-6", src: "/photo/april/quote.webp", gridArea: "f" },
    ],
  },
  {
    id: "may",
    name: "May",
    shortName: "MAY",
    layout: "bento",
    photos: [
      { id: "may-1", src: "/photo/may/1.webp", gridArea: "a" },
      { id: "may-2", src: "/photo/may/2.webp", gridArea: "b" },
      { id: "may-3", src: "/photo/may/3.webp", gridArea: "c" },
      { id: "may-6", src: "/photo/may/6.webp", gridArea: "f" },
      { id: "may-7", src: "/photo/may/7.webp", gridArea: "g" },
      { id: "may-8", src: "/photo/may/8.webp", gridArea: "h" },
      { id: "may-9", src: "/photo/may/9.webp", gridArea: "i" },
    ],
  },
  {
    id: "june",
    name: "June",
    shortName: "JUN",
    layout: "bento",
    photos: [
      { id: "jun-1", src: "/photo/june/1.webp", gridArea: "a" },
      { id: "jun-2", src: "/photo/june/2.webp", gridArea: "b" },
      { id: "jun-4", src: "/photo/june/4.webp", gridArea: "d" },
      { id: "jun-5", src: "/photo/june/5.webp", gridArea: "e" },
      { id: "jun-6", src: "/photo/june/6.webp", gridArea: "f" },
      { id: "jun-7", src: "/photo/june/7.webp", gridArea: "g" },
      { id: "jun-8", src: "/photo/june/8.webp", gridArea: "h" },
      { id: "jun-9", src: "/photo/june/9.webp", gridArea: "i" },
      { id: "jun-10", src: "/photo/june/10.webp", gridArea: "j" },
      { id: "jun-11", src: "/photo/june/11.webp", gridArea: "k" },
      { id: "jun-12", src: "/photo/june/12.webp", gridArea: "l" },
      { id: "jun-13", src: "/photo/june/13.webp", gridArea: "m" },
      { id: "jun-14", src: "/photo/june/14.webp", gridArea: "n" },
      { id: "jun-15", src: "/photo/june/15.webp", gridArea: "o" },
    ],
  },
  {
    id: "july",
    name: "July",
    shortName: "JUL",
    layout: "bento",
    photos: [
      { id: "jul-1", src: "/photo/july/1.webp", gridArea: "a" },
      { id: "jul-2", src: "/photo/july/2.webp", gridArea: "b" },
      { id: "jul-3", src: "/photo/july/3.webp", gridArea: "c" },
      { id: "jul-4", src: "/photo/july/4.webp", gridArea: "d" },
      { id: "jul-5", src: "/photo/july/5.webp", gridArea: "e" },
      { id: "jul-6", src: "/photo/july/6.webp", gridArea: "f" },
      { id: "jul-7", src: "/photo/july/7.webp", gridArea: "g" },
      { id: "jul-8", src: "/photo/july/8.webp", gridArea: "h" },
      { id: "jul-9", src: "/photo/july/9.webp", gridArea: "i" },
    ],
  },
  {
    id: "august",
    name: "August",
    shortName: "AUG",
    layout: "bento",
    photos: [
      { id: "aug-1", src: "/photo/august/1.webp", gridArea: "a" },
      { id: "aug-2", src: "/photo/august/2.webp", gridArea: "b" },
      { id: "aug-3", src: "/photo/august/3.webp", gridArea: "c" },
      { id: "aug-4", src: "/photo/august/4.webp", gridArea: "d" },
      { id: "aug-5", src: "/photo/august/5.mp4", gridArea: "e", type: "video" },
      { id: "aug-7", src: "/photo/august/7.webp", gridArea: "g" },
      { id: "aug-8", src: "/photo/august/8.webp", gridArea: "h" },
      { id: "aug-9", src: "/photo/august/9.webp", gridArea: "i" },
    ],
  },
  {
    id: "september",
    name: "September",
    shortName: "SEP",
    layout: "bento",
    photos: [
      { id: "sep-1", src: "/photo/september/1.webp", gridArea: "a" },
      { id: "sep-2", src: "/photo/september/2.webp", gridArea: "b" },
      { id: "sep-3", src: "/photo/september/3.webp", gridArea: "c" },
      { id: "sep-4", src: "/photo/september/4.webp", gridArea: "d" },
      { id: "sep-5", src: "/photo/september/5.webp", gridArea: "e" },
      { id: "sep-6", src: "/photo/september/6.webp", gridArea: "f" },
      { id: "sep-7", src: "/photo/september/7.webp", gridArea: "g" },
      { id: "sep-9", src: "/photo/september/9.webp", gridArea: "i" },
      { id: "sep-10", src: "/photo/september/10.webp", gridArea: "j" },
    ],
  },
  {
    id: "october",
    name: "October",
    shortName: "OCT",
    layout: "bento",
    photos: [
      { id: "oct-1", src: "/photo/october/1.webp", gridArea: "a" },
      { id: "oct-2", src: "/photo/october/2.webp", gridArea: "b" },
      { id: "oct-3", src: "/photo/october/3.webp", gridArea: "c" },
      { id: "oct-4", src: "/photo/october/4.webp", gridArea: "d" },
      { id: "oct-5", src: "/photo/october/5.webp", gridArea: "e" },
      { id: "oct-6", src: "/photo/october/6.webp", gridArea: "f" },
      { id: "oct-7", src: "/photo/october/7.webp", gridArea: "g" },
      { id: "oct-8", src: "/photo/october/8.webp", gridArea: "h" },
    ],
  },
  {
    id: "november",
    name: "November",
    shortName: "NOV",
    layout: "bento",
    photos: [
      { id: "nov-1", src: "/photo/november/1.webp", gridArea: "a" },
      { id: "nov-2", src: "/photo/november/2.webp", gridArea: "b" },
      { id: "nov-4", src: "/photo/november/4.webp", gridArea: "d" },
      { id: "nov-7", src: "/photo/november/7.webp", gridArea: "g" },
      { id: "nov-8", src: "/photo/november/8.webp", gridArea: "h" },
      { id: "nov-9", src: "/photo/november/9.webp", gridArea: "i" },
      { id: "nov-10", src: "/photo/november/10.webp", gridArea: "j" },
      { id: "nov-11", src: "/photo/november/11.webp", gridArea: "k" },
    ],
  },
  {
    id: "december",
    name: "December",
    shortName: "DEC",
    layout: "bento",
    photos: [
      { id: "dec-1", src: "/photo/december/1.webp", gridArea: "a" },
      { id: "dec-2", src: "/photo/december/2.webp", gridArea: "b" },
      { id: "dec-3", src: "/photo/december/3.webp", gridArea: "c" },
      { id: "dec-4", src: "/photo/december/4.webp", gridArea: "d" },
      { id: "dec-5", src: "/photo/december/5.webp", gridArea: "e" },
      { id: "dec-6", src: "/photo/december/6.webp", gridArea: "f" },
      { id: "dec-7", src: "/photo/december/7.webp", gridArea: "g" },
      { id: "dec-8", src: "/photo/december/8.webp", gridArea: "h" },
      { id: "dec-9", src: "/photo/december/9.webp", gridArea: "i" },
      { id: "dec-10", src: "/photo/december/10.webp", gridArea: "j" },
      { id: "dec-11", src: "/photo/december/11.webp", gridArea: "k" },
      { id: "dec-12", src: "/photo/december/12.webp", gridArea: "l" },
      { id: "dec-13", src: "/photo/december/13.webp", gridArea: "m" },
      { id: "dec-14", src: "/photo/december/14.webp", gridArea: "n" },
      { id: "dec-15", src: "/photo/december/15.webp", gridArea: "o" },
    ],
  },
];

export const PUM_SECTIONS: PumSection[] = [
  {
    date: "Nov 2022",
    images: [
      "IMG_2203.webp",
      "IMG_2204.webp",
      "IMG_2205.webp",
      "IMG_2206.webp",
      "IMG_2207.webp",
      "IMG_2208.webp",
    ],
  },
  {
    date: "Dec 2022",
    images: ["IMG_2209.webp", "IMG_2210.webp"],
  },
  {
    date: "Jan 2023",
    images: ["IMG_2211.webp", "IMG_2212.webp"],
  },
  {
    date: "Feb 2023",
    images: ["IMG_2213.webp", "IMG_2214.webp"],
  },
  {
    date: "Mar 2023",
    images: [
      "IMG_2215.webp",
      "IMG_2216.webp",
      "IMG_2217.webp",
      "IMG_2218.webp",
      "IMG_2219.webp",
      "IMG_2220.webp",
      "IMG_2221.webp",
      "IMG_2222.webp",
    ],
  },
  {
    date: "Jun 2023",
    images: ["IMG_2223.webp"],
  },
  {
    date: "Dec 2023",
    images: [
      "IMG_2224.webp",
      "IMG_2225.webp",
      "IMG_2226.webp",
      "IMG_2238.webp",
    ],
  },
  {
    date: "Feb 2024",
    images: ["IMG_2227.webp", "IMG_2228.webp"],
  },
  {
    date: "Jun 2024",
    images: ["IMG_2229.webp", "IMG_2230.webp", "IMG_1828.webp"],
  },
  {
    date: "Oct 2024",
    images: [
      "IMG_2231.webp",
      "IMG_2232.webp",
      "IMG_2233.webp",
      "IMG_2234.webp",
      "IMG_1938.webp",
      "IMG_2236.webp",
      "IMG_1936.webp",
    ],
  },
  {
    date: "Dec 2025",
    images: [
      "IMG_1775.webp",
      "IMG_1778.webp",
      "IMG_1935.webp",
      "IMG_2068.webp",
      "IMG_2069 2.webp",
      "IMG_2070.webp",
      "IMG_2071 2.webp",
      "IMG_2240.webp",
    ],
  },
];
