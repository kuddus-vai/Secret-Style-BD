export interface RealCustomerPhotoReview {
  id: string;
  image: string;
  customerName: string;
  location: string;
  captionBn: string;
  captionEn?: string;
  tag: 'all' | 'tshirt' | 'plus-size' | 'combo' | 'unboxing';
  tagLabelBn: string;
  productName?: string;
  rating?: number;
}

export interface CustomerReview {
  id: string;
  rating: number;
  date: string;
  commentBn: string;
  comment: string;
  image?: string;
  avatarBg: string;
  customerName: string;
  verifiedPurchase: boolean;
  location: string;
  productName: string;
}

export const REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    rating: 5,
    date: '২ দিন আগে',
    commentBn: 'প্রাইমার্কের পিজে শার্টটা হাতে পেয়ে সত্যিই অবাক হয়েছি! একদম পিওর সফট কটন, সামনে সুন্দর বাটন আর কলার পাইপিং ফিনিশিং অস্থির। মাত্র ২৫০ টাকায় এমন এক্সপোর্ট কোয়ালিটি পাওয়া অসম্ভব।',
    comment: 'Got the Primark PJ shirt and was amazed by the quality! Pure soft cotton, neat buttons, and contrast piping for just ৳250.',
    image: '/assets/products/112.jpg',
    avatarBg: 'bg-rose-100 text-rose-800',
    customerName: 'তানজিলা হক নিঝুম',
    verifiedPurchase: true,
    location: 'ধানমন্ডি, ঢাকা',
    productName: 'প্রাইমার্ক কেয়ার্স স্ট্রাইপড পিজে স্লিপ শার্ট'
  },
  {
    id: 'rev-2',
    rating: 5,
    date: '৪ দিন আগে',
    commentBn: '৩টি কটন শর্টসের কম্বো নিয়েছিলাম। কাপড় এতো আরামদায়ক আর ব্রেথেবল যে গরমে ঘরে পরার জন্য বেস্ট। কালারও ছবি থেকে সুন্দর। ডেলিভারি ম্যানের সামনে চেক করে টাকা দিয়েছি।',
    comment: 'Ordered the 3-shorts combo pack. Super breathable cotton, perfect for summer lounge wear. Checked parcel before COD.',
    image: '/assets/products/130.jpg',
    avatarBg: 'bg-emerald-100 text-emerald-800',
    customerName: 'ফারহানা ইসলাম শশী',
    verifiedPurchase: true,
    location: 'উত্তরা, ঢাকা',
    productName: '৩টি সামার কটন শর্টস সুপার সেভার কম্বো'
  },
  {
    id: 'rev-3',
    rating: 5,
    date: '১ সপ্তাহ আগে',
    commentBn: 'হ্যালো কিটি পায়জামা প্যান্টের কাপড় অসম্ভব নরম! লেন্থ ৩৭ ইঞ্চি একদম পারফেক্ট এসেছে। কোমর আর হিপে সুন্দর ড্র-স্ট্রিং ফিটিং। আমার ছোট বোনের জন্য আরেকটা অর্ডার করছি।',
    comment: 'Hello Kitty pajama pant is ultra soft and comfortable. Perfect 37" length with adjustable drawstring waist.',
    image: '/assets/products/100.jpg',
    avatarBg: 'bg-purple-100 text-purple-800',
    customerName: 'নুসরাত জাহান মিম',
    verifiedPurchase: true,
    location: 'জিইসি মোড়, চট্টগ্রাম',
    productName: 'হ্যালো কিটি ও রিবন সফট পিঙ্ক পায়জামা প্যান্ট'
  },
  {
    id: 'rev-4',
    rating: 5,
    date: '১ সপ্তাহ আগে',
    commentBn: '১০০% কটন প্যান্টির কোয়ালিটি সত্যি স্কিন ফ্রেন্ডলি। র‍্যাশ বা ইলাস্টিকের দাগ পড়ে না। সিক্রেট স্টাইল বিডি থেকে নিয়মিত নিচ্ছি, তাদের সার্ভিস ও ফাস্ট ডেলিভারি প্রশংসনীয়।',
    comment: '100% cotton panties are truly hypoallergenic and soft. No rashes or pinching. Excellent delivery service!',
    image: '/assets/products/094.jpg',
    avatarBg: 'bg-amber-100 text-amber-800',
    customerName: 'সাদিয়া আফরিন রিয়া',
    verifiedPurchase: true,
    location: 'উপশহর, রাজশাহী',
    productName: '১০০% পিওর কটন সেনসিটিভ স্কিন প্যান্টি'
  }
];

export const REAL_CUSTOMER_PHOTO_REVIEWS: RealCustomerPhotoReview[] = [
  {
    id: 'photo-1',
    image: '/assets/products/112.jpg',
    customerName: 'তাসমিয়া আহমেদ',
    location: 'গুলশান, ঢাকা',
    captionBn: 'প্রাইমার্ক পিজে শার্টের রিয়েল স্ন্যাপ - অসাধারণ ফিনিশিং!',
    captionEn: 'Real Primark PJ Shirt snapshot - pristine finish!',
    tag: 'unboxing',
    tagLabelBn: 'পিজে শার্ট'
  },
  {
    id: 'photo-2',
    image: '/assets/products/100.jpg',
    customerName: 'মালিহা রহমান',
    location: 'বনশ্রী, ঢাকা',
    captionBn: 'হ্যালো কিটি প্রিন্টেড পায়জামা প্যান্ট আনবক্সিং',
    captionEn: 'Hello Kitty pajama pant unboxing',
    tag: 'plus-size',
    tagLabelBn: 'পায়জামা প্যান্ট'
  },
  {
    id: 'photo-3',
    image: '/assets/products/130.jpg',
    customerName: 'রাবেয়া সুলতানা',
    location: 'খুলনা সদর',
    captionBn: 'সামার মেরিন ক্র্যাব শর্টস - ১০০% পিওর কটন',
    captionEn: 'Summer ocean crab shorts - 100% pure cotton',
    tag: 'combo',
    tagLabelBn: 'কটন শর্টস'
  },
  {
    id: 'photo-4',
    image: '/assets/products/109.jpg',
    customerName: 'ফারজানা ববি',
    location: 'সিলেট',
    captionBn: 'ব্ল্যাক স্ট্রাইপ পিজে বাটন শার্ট আনবক্সিং',
    captionEn: 'Black striped PJ button shirt unboxing',
    tag: 'unboxing',
    tagLabelBn: 'পিজে শার্ট'
  },
  {
    id: 'photo-5',
    image: '/assets/products/096.jpg',
    customerName: 'সাবরিনা আক্তার',
    location: 'কুমিল্লা',
    captionBn: 'ক্যাট ডুডল পায়জামা প্যান্ট - অনেক কমফোর্টেবল',
    captionEn: 'Cat doodle pajama pant - super comfy',
    tag: 'plus-size',
    tagLabelBn: 'পায়জামা প্যান্ট'
  },
  {
    id: 'photo-6',
    image: '/assets/products/136.jpg',
    customerName: 'রুবাইয়া ইয়াসমিন',
    location: 'মিরপুর, ঢাকা',
    captionBn: 'হার্ট লেইস শর্টস - কোমর ফিটিং দারুণ',
    captionEn: 'Heart lace shorts - comfortable fit',
    tag: 'combo',
    tagLabelBn: 'কটন শর্টস'
  },
  {
    id: 'photo-7',
    image: '/assets/products/094.jpg',
    customerName: 'জান্নাতুল ফেরদৌস',
    location: 'রংপুর',
    captionBn: '১০০% কটন সেনসিটিভ স্কিন প্যান্টি প্যাক',
    captionEn: '100% pure cotton sensitive skin panty pack',
    tag: 'unboxing',
    tagLabelBn: 'প্যান্টি কালেকশন'
  },
  {
    id: 'photo-8',
    image: '/assets/products/113.jpg',
    customerName: 'ফারাহ নাজ',
    location: 'মোহাম্মদপুর, ঢাকা',
    captionBn: 'মাতালান ইউকে সামার সিট্রাস স্লিপ শার্ট',
    captionEn: 'Matalan UK summer citrus sleep shirt',
    tag: 'unboxing',
    tagLabelBn: 'পিজে শার্ট'
  },
  {
    id: 'photo-9',
    image: '/assets/products/124.jpg',
    customerName: 'জেরিন তাসনিম',
    location: 'বগুড়া',
    captionBn: 'পাম ট্রি সামার লাউঞ্জ শর্টস',
    captionEn: 'Palm tree summer lounge shorts',
    tag: 'combo',
    tagLabelBn: 'কটন শর্টস'
  },
  {
    id: 'photo-10',
    image: '/assets/products/099.jpg',
    customerName: 'আফসানা মিমি',
    location: 'নারায়ণগঞ্জ',
    captionBn: 'ল্যাভেন্ডার সেলেস্টিয়াল ট্রাউজার প্যান্ট',
    captionEn: 'Lavender celestial trouser pant',
    tag: 'plus-size',
    tagLabelBn: 'পায়জামা প্যান্ট'
  },
  {
    id: 'photo-11',
    image: '/assets/products/118.jpg',
    customerName: 'মেহজাবিন আলম',
    location: 'গাজীপুর',
    captionBn: 'লেইস প্যানেল সফট কমফোর্ট প্যান্টি',
    captionEn: 'Lace panel soft comfort panty',
    tag: 'unboxing',
    tagLabelBn: 'প্যান্টি কালেকশন'
  },
  {
    id: 'photo-12',
    image: '/assets/products/133.jpg',
    customerName: 'সায়মা নওশীন',
    location: 'যশোর',
    captionBn: 'রেড হার্ট রাফেল হেম কটন শর্টস',
    captionEn: 'Red heart ruffle hem cotton shorts',
    tag: 'combo',
    tagLabelBn: 'কটন শর্টস'
  }
];
