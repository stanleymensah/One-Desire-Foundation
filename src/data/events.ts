import Y4K from "@/assets/Y4K.jpg";
import OneWash from "@/assets/one-wash.png";
import Charity from "@/assets/charity-drive.png"


type FoundationActivity = {
  name: string;
  type: "Event" | "Campaign" | "Collaboration";
  link: string | null;
  image: string | null;
  details: {
    date: string;
    time: string | null;
    location: string | null;
  };
};

export const events: FoundationActivity[] = [
  {
    name: "One Desire Sickle Cell Foundation Soft Launch",
    type: "Event",
    link: null,
    image: null,
    details: {
      date: "23 September 2024",
      time: null,
      location: null,
    },
  },
  {
    name: "Sickle Cell Education Engagement at Labone Senior High School",
    type: "Event",
    link: null,
    image: null,
    details: {
      date: "18 June 2025",
      time: null,
      location: "Labone Senior High School",
    },
  },
  {
    name: "Engagement at St. John's Grammar School",
    type: "Event",
    link: null,
    image: null,
    details: {
      date: "16 July 2025",
      time: null,
      location: "St. John's Grammar School",
    },
  },
  {
    name: "Engagement at St. John's Grammar School",
    type: "Event",
    link: null,
    image: null,
    details: {
      date: "21 July 2025",
      time: null,
      location: "St. John's Grammar School",
    },
  },
  {
    name: "Accra Academy School Outreach",
    type: "Event",
    link: null,
    image: null,
    details: {
      date: "23 July 2025",
      time: null,
      location: "Accra Academy",
    },
  },
  {
    name: "One Wash, One Hope",
    type: "Campaign",
    link: null,
    image: OneWash,
    details: {
      date: "20 September 2025",
      time: null,
      location: "Untamed Empire",
    },
  },
  {
    name: "Osu Community Outreach with White Jades",
    type: "Collaboration",
    link: 'https://www.linkedin.com/posts/one-desire-foundation_ahead-of-the-christmas-holidays-one-desire-activity-7412201313473830912-beHQ',
    image: Charity,
    details: {
      date: "20 December 2025",
      time: null,
      location: "Osu",
    },
  },
  {
    name: "Hugs & Smiles with The Perrie Foundation",
    type: "Collaboration",
    link: null,
    image: null,
    details: {
      date: "24 January 2026",
      time: null,
      location: "Dawa Tokro",
    },
  },
  {
    name: "Outreach and Blood Donation Exercise at Asesewa Senior High School",
    type: "Event",
    link: null,
    image: null,
    details: {
      date: "11 February 2026",
      time: null,
      location: "Asesewa Senior High School",
    },
  },
  {
    name: "Blood Donation Exercise at St. John's Grammar School",
    type: "Event",
    link: null,
    image: null,
    details: {
      date: "16 June 2026",
      time: null,
      location: "St. John's Grammar School",
    },
  },
  {
    name: "3rd Annual ISCC Sickle Cell Disease Conference",
    type: "Event",
    link: null,
    image: null,
    details: {
      date: "19 June 2026",
      time: null,
      location: null,
    },
  },
  {
    name: "You For Know",
    type: "Campaign",
    link: null,
    image: Y4K,
    details: {
      date: "19 September 2026",
      time: null,
      location: null,
    },
  },
];
