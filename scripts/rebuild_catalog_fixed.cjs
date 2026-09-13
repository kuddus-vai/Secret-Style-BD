const fs = require('fs');
const path = require('path');

const audit = JSON.parse(fs.readFileSync('product_audit.json', 'utf8'));

// Helper to check for existing detail image
function getGalleryImages(file) {
  const base = file.replace('.jpg', '');
  const list = [`/assets/products/${file}`];
  const detail = `${base}_detail.jpg`;
  if (fs.existsSync(path.join('public/assets/products', detail))) {
    list.push(`/assets/products/${detail}`);
  }
  const copy = `${base} (copy 1).jpg`;
  if (fs.existsSync(path.join('public/assets/products', copy))) {
    list.push(`/assets/products/${copy}`);
  }
  return list;
}

// 1. PJ Shirts (পিজে স্লিপ শার্ট - Button-Down PJ Shirts with collar & front buttons)
const pjShirtsData = [
  {
    file: '112.jpg',
    id: 'pj-shirt-primark-stripes',
    name: 'Primark Cares Striped PJ Sleep Shirt',
    nameBn: 'প্রাইমার্ক কেয়ার্স স্ট্রাইপড পিজে স্লিপ শার্ট',
    price: 250,
    originalPrice: 450,
    badge: 'Special Offer ৳250',
    badgeBn: 'স্পেশাল অফার ২৫০৳',
    isBestSeller: true,
    chest: '32"-36"',
    length: '24"',
    descBn: 'অরিজিনাল প্রাইমার্ক কেয়ার্স (Primark Cares) এক্সপোর্ট কোয়ালিটি বাটন-ডাউন পিজে স্লিপ শার্ট। নচড ল্যাপেল কলার, সামনে বাটন এবং কন্ট্রাস্ট পাইপিং সহ ফ্রন্ট পকেট। আরামদায়ক ও ব্রেথেবল সফট কটন ফেব্রিক।',
    descEn: 'Original Primark Cares export quality button-down PJ sleep shirt. Features notched lapel collar, front buttons, contrast piping, and chest pocket in breathable soft cotton.'
  },
  {
    file: '109.jpg',
    id: 'pj-shirt-fine-stripe-bw',
    name: 'Black & White Classic Striped PJ Shirt',
    nameBn: 'ব্ল্যাক অ্যান্ড হোয়াইট ক্লাসিক স্ট্রাইপড পিজে শার্ট',
    price: 250,
    originalPrice: 450,
    badge: 'Export Quality',
    badgeBn: 'এক্সপোর্ট কোয়ালিটি',
    isBestSeller: true,
    chest: '30"-34"',
    length: '24"',
    descBn: 'ক্লাসিক ব্ল্যাক ও হোয়াইট ভার্টিক্যাল স্ট্রাইপ এক্সপোর্ট স্লিপ শার্ট। সামনে বাটনিং ক্লোজার ও নচড কলার ডিজাইন, যা রাতে ও ঘরে পরার জন্য অত্যন্ত আরামদায়ক।',
    descEn: 'Classic black & white vertical stripe export sleep shirt with notched collar, front button closure, and breathable cotton fabric.'
  },
  {
    file: '110.jpg',
    id: 'pj-shirt-soft-cotton-navy',
    name: 'Heather Striped Soft Cotton PJ Shirt',
    nameBn: 'হেদার স্ট্রাইপড সফট কটন পিজে শার্ট',
    price: 250,
    originalPrice: 420,
    badge: '100% Cotton',
    badgeBn: '১০০% কটন',
    isBestSeller: false,
    chest: '32"-36"',
    length: '24"',
    descBn: 'সফট কটন স্ট্রাইপড পিজে শার্ট। সূক্ষ্ম বোতাম ও ল্যাপেল কলার ফিনিশিং সহ আরামদায়ক স্লিপওয়্যার শার্ট।',
    descEn: 'Soft cotton heather striped PJ sleep shirt with neat lapel collar and front buttons for nightly ease.'
  },
  {
    file: '111.jpg',
    id: 'pj-shirt-navy-fine-stripe',
    name: 'Navy Classic Pinstripe PJ Sleep Shirt',
    nameBn: 'নেভি ক্লাসিক পিনস্ট্রাইপ পিজে স্লিপ শার্ট',
    price: 250,
    originalPrice: 450,
    badge: 'Export Quality',
    badgeBn: 'এক্সপোর্ট কালেকশন',
    isBestSeller: false,
    chest: '30"-34"',
    length: '23.5"',
    descBn: 'নেভি ব্লু ও হোয়াইট পিনস্ট্রাইপ পিজে শার্ট (2XS)। এক্সপোর্ট কোয়ালিটির সফট কটন ফেব্রিক ও প্রফেশনাল ফিনিশিং।',
    descEn: 'Navy and white fine pinstripe PJ sleep shirt in export quality soft cotton with collar and buttons.'
  },
  {
    file: '113.jpg',
    id: 'pj-shirt-matalan-citrus',
    name: 'Matalan Be Beau Summer Citrus PJ Shirt',
    nameBn: 'মাতালান বি বো সামার সিট্রাস প্রিন্ট পিজে শার্ট',
    price: 250,
    originalPrice: 450,
    badge: 'Matalan UK Export',
    badgeBn: 'মাতালান ইউকে এক্সপোর্ট',
    isBestSeller: true,
    chest: '36"-40"',
    length: '25"',
    descBn: 'অরিজিনাল মাতালান ইউকে (Matalan Be Beau) এক্সপোর্ট স্লিপ শার্ট। প্লেফুল সামার অরেঞ্জ স্লাইস ও সান প্রিন্ট, ফ্রন্ট বাটন ও পকেট সহ প্রিমিয়াম কোয়ালিটি।',
    descEn: 'Authentic Matalan UK Be Beau export sleep shirt featuring summer citrus fruit prints, collar, and front buttons.'
  },
  {
    file: '114.jpg',
    id: 'pj-shirt-sunshine-citrus',
    name: 'Sunny Citrus & Wave Print PJ Shirt',
    nameBn: 'সানি সিট্রাস ও ওয়েভ প্রিন্ট পিজে স্লিপ শার্ট',
    price: 250,
    originalPrice: 450,
    badge: 'Limited Stock',
    badgeBn: 'সীমিত স্টক',
    isBestSeller: false,
    chest: '34"-38"',
    length: '24.5"',
    descBn: 'সামার সিট্রাস ও ওয়েভ প্রিন্টের ইউনিক পিজে বাটন শার্ট। লাইটওয়েট, ব্রেথেবল কটন যা গরমে দেয় সর্বোত্তম স্বস্তি।',
    descEn: 'Lightweight and airy summer print PJ sleep shirt with notched collar and button placket.'
  }
];

// 2. Panties & Underwear (প্যান্টি ও ইনারওয়্যার - 100% Cotton & Lace Panties/Underwear/Thongs)
const pantiesData = [
  {
    file: '094.jpg',
    id: 'panty-pure-cotton-grey',
    name: '100% Pure Cotton Sensitive Skin Panty (Grey Heather)',
    nameBn: '১০০% পিওর কটন সেনসিটিভ স্কিন প্যান্টি (গ্রে হেদার)',
    price: 130,
    originalPrice: 200,
    badge: '100% Cotton',
    badgeBn: '১০০% পিওর কটন',
    isBestSeller: true,
    waist: '28"-38"',
    descBn: 'সিক্রেট স্টাইল বিডি এক্সক্লুসিভ ১০০% পিওর কটন প্যান্টি। সেনসিটিভ স্কিনের জন্য সম্পূর্ণ নিরাপদ, অ্যান্টি-ব্যাকটেরিয়াল লাইনিং এবং সারা দিন স্বাচ্ছন্দ্যে ব্যবহারের উপযোগী।',
    descEn: '100% pure cotton everyday comfort panty, specially designed for sensitive skin with soft breathable elastic.'
  },
  {
    file: '095.jpg',
    id: 'panty-pure-cotton-peach',
    name: '100% Pure Cotton Sensitive Skin Panty (Soft Peach)',
    nameBn: '১০০% পিওর কটন সেনসিটিভ স্কিন প্যান্টি (সফট পীচ)',
    price: 130,
    originalPrice: 200,
    badge: 'Sensitive Skin Safe',
    badgeBn: 'স্কিন ফ্রেন্ডলি',
    isBestSeller: true,
    waist: '28"-38"',
    descBn: 'সফট পীচ পিওর কটন প্যান্টি। র‍্যাশ-ফ্রি সফট ইলাস্টিক ও স্কিন ফ্রেন্ডলি প্রাকৃতিক ফেব্রিক।',
    descEn: 'Soft peach pure cotton brief with rash-free comfort waistband and natural hypoallergenic breathability.'
  },
  {
    file: '107.jpg',
    id: 'panty-lace-comfort-xl-lilac',
    name: 'Secret Style BD Floral Lace Comfort Panty (Lilac XL)',
    nameBn: 'ফ্লোরাল লেইস কমফোর্ট প্যান্টি (লাইলাক এক্স-এল)',
    price: 140,
    originalPrice: 220,
    badge: 'XL Size Available',
    badgeBn: 'এক্স-এল সাইজ',
    isBestSeller: false,
    waist: '34"-42"',
    descBn: 'প্রিমিয়াম সফট ফ্লোরাল লেইস ডিটেইলিং সহ কমফোর্ট প্যান্টি। সফট মাইক্রোফাইবার ও কটন গাসেট লাইনিং সহ এক্স-এল সাইজ।',
    descEn: 'Floral lace trimmed comfort panty in XL size with soft breathable cotton gusset lining.'
  },
  {
    file: '108.jpg',
    id: 'panty-lace-floral-delicate-xl',
    name: 'Delicate Floral Lace Trimmed Panty (XL Size)',
    nameBn: 'ডেলিক্সি ফ্লোরাল লেইস ট্রিমড প্যান্টি (এক্স-এল সাইজ)',
    price: 140,
    originalPrice: 220,
    badge: 'Lace Collection',
    badgeBn: 'লেইস কালেকশন',
    isBestSeller: false,
    waist: '34"-42"',
    descBn: 'ফ্লোরাল লেইস একসেন্ট সহ আকর্ষণীয় আরামদায়ক প্যান্টি। নরম ফ্লেক্সিবল স্ট্রেচ ফেব্রিক।',
    descEn: 'Elegant floral lace accent brief with flexible stretch and breathable inner cotton lining.'
  },
  {
    file: '115.jpg',
    id: 'panty-soft-cotton-blue-l',
    name: 'Wednesday Soft Cotton Graphic Panty (Sky Blue L)',
    nameBn: 'ওয়েডসডে সফট কটন গ্রাফিক প্যান্টি (স্কাই ব্লু L)',
    price: 130,
    originalPrice: 200,
    badge: 'L Size',
    badgeBn: 'L সাইজ',
    isBestSeller: false,
    waist: '30"-38"',
    descBn: 'স্কাই ব্লু সফট কটন প্যান্টি। সূক্ষ্ম ফ্লোরাল ও ওয়েডসডে গ্রাফিক সহ নরম ব্রিদিং ফ্যাব্রিক।',
    descEn: 'Sky blue soft cotton brief with Wednesday graphic detail and soft non-pinching elastic.'
  },
  {
    file: '118.jpg',
    id: 'panty-lace-side-black-l',
    name: 'Secret Style BD Lace Side Panel Panty (Midnight Black L)',
    nameBn: 'লেইস সাইড প্যানেল প্যান্টি (মিডনাইট ব্ল্যাক L)',
    price: 140,
    originalPrice: 220,
    badge: 'Lace Accent',
    badgeBn: 'লেইস সাইড প্যানেল',
    isBestSeller: true,
    waist: '30"-38"',
    descBn: 'মিডনাইট ব্ল্যাক সফট ফেব্রিক ও সাইডে আকর্ষণীয় লেইস প্যানেল সহ স্টাইলিশ প্যান্টি।',
    descEn: 'Midnight black comfortable panty with delicate lace side panels and full rear coverage.'
  },
  {
    file: '119.jpg',
    id: 'panty-wednesday-charcoal-l',
    name: 'Wednesday Soft Comfort Panty (Charcoal Heather L)',
    nameBn: 'ওয়েডসডে সফট কমফোর্ট প্যান্টি (চারকোল হেদার L)',
    price: 130,
    originalPrice: 200,
    badge: 'L Size',
    badgeBn: 'L সাইজ',
    isBestSeller: false,
    waist: '30"-38"',
    descBn: 'চারকোল হেদার সফট কটন প্যান্টি। আরামদায়ক ওয়েস্টব্যান্ড ও ডেইলি ওয়্যার কমফোর্ট।',
    descEn: 'Charcoal heather cotton panty offering smooth comfort and breathable everyday wear.'
  }
];

// 3. Pajama Pants & Trousers (পায়জামা ও ট্রাউজার প্যান্ট - Full length 36"-38")
const pajamasData = [
  {
    file: '100.jpg',
    id: 'pj-pant-hello-kitty-ribbon',
    name: 'Hello Kitty & Ribbon Pastel Pink Pajama Pant',
    nameBn: 'হ্যালো কিটি ও রিবন সফট পিঙ্ক পায়জামা প্যান্ট',
    price: 290,
    originalPrice: 480,
    badge: 'Most Loved 🎀',
    badgeBn: 'টপ ফেভারিট 🎀',
    isBestSeller: true,
    waist: '26"-36"',
    hip: '38"-50"',
    long: '37"',
    descBn: '১০০% সফট কটন কিউট হ্যালো কিটি ও রিবন প্রিন্টেড পায়জামা প্যান্ট। লেন্থ ৩৭ ইঞ্চি, কোমর ২৬"-৩৬", হিপ ৩৮"-৫০"। সফট ইলাস্টিক ও ড্র-স্ট্রিং সমন্বিত আরামদায়ক স্লিপ ট্রাউজার।',
    descEn: 'Cute Hello Kitty and ribbon character print pajama pant. Length 37", waist 26"-36", hip 38"-50" with comfortable elastic waistband.'
  },
  {
    file: '101.jpg',
    id: 'pj-pant-hello-kitty-candy-rose',
    name: 'Hello Kitty Candy Rose Pink Pajama Pant',
    nameBn: 'হ্যালো কিটি ক্যান্ডি রোজ পিঙ্ক পায়জামা প্যান্ট',
    price: 290,
    originalPrice: 480,
    badge: 'Best Seller',
    badgeBn: 'বেস্ট সেলার',
    isBestSeller: true,
    waist: '26"-34"',
    hip: '36"-42"',
    long: '38"',
    descBn: 'ক্যান্ডি রোজ পিঙ্ক হ্যালো কিটি মোটিফ প্রিন্ট। লেন্থ ৩৮ ইঞ্চি, কোমর ২৬"-৩৪", হিপ ৩৬"-৪২"। ব্রেথেবল সফট কটন।',
    descEn: 'Candy rose pink Hello Kitty motif pajama pant in pure breathable cotton. Length 38", waist 26"-34".'
  },
  {
    file: '096.jpg',
    id: 'pj-pant-cat-line-art',
    name: 'Whimsical Cat Line-Art Oatmeal Pajama Pant',
    nameBn: 'কিউট ক্যাট লাইন-আর্ট ওটমিল পায়জামা প্যান্ট',
    price: 280,
    originalPrice: 450,
    badge: 'Cute Cat Print 🐱',
    badgeBn: 'কিউট ক্যাট প্রিন্ট 🐱',
    isBestSeller: true,
    waist: '28"-36"',
    hip: '40"-48"',
    long: '36"',
    descBn: 'আকর্ষণীয় ক্যাট লাইন-আর্ট প্রিন্টেড স্লিপ ট্রাউজার। লেন্থ ৩৬ ইঞ্চি, কোমর ২৮"-৩৬", হিপ ৪০"-৪৮"। সম্পূর্ণ নন-ট্রান্সপারেন্ট ও ওয়াশেবল কটন।',
    descEn: 'Playful cat doodle illustration print pajama pant. Length 36", waist 28"-36", hip 40"-48".'
  },
  {
    file: '097.jpg',
    id: 'pj-pant-gingerbread-navy',
    name: 'Festive Gingerbread Midnight Navy Pajama Pant',
    nameBn: 'জিঞ্জারব্রেড মিডনাইট নেভি পায়জামা প্যান্ট',
    price: 280,
    originalPrice: 450,
    badge: 'Plus Size Fit',
    badgeBn: 'প্লাস সাইজ ফিট',
    isBestSeller: false,
    waist: '34"-44"',
    hip: '46"-56"',
    long: '38"',
    descBn: 'মিডনাইট নেভি জিঞ্জারব্রেড প্রিন্টেড পাজামা প্যান্ট। লেন্থ ৩৮ ইঞ্চি, কোমর ৩৪"-৪৪", হিপ ৪৬"-৫৬"। প্লাস সাইজের আপুদের জন্য চমৎকার কমফোর্ট ফিট।',
    descEn: 'Midnight navy festive print pajama pant with relaxed plus-size friendly fit. Length 38", waist 34"-44".'
  },
  {
    file: '098.jpg',
    id: 'pj-pant-candy-cane-pink',
    name: 'Candy Cane Sweet Stripe Pajama Pant',
    nameBn: 'ক্যান্ডি ক্যান সুইট স্ট্রাইপ পায়জামা প্যান্ট',
    price: 280,
    originalPrice: 450,
    badge: 'Pure Cotton',
    badgeBn: 'পিওর কটন',
    isBestSeller: false,
    waist: '26"-34"',
    hip: '36"-46"',
    long: '37"',
    descBn: 'সফট পিঙ্ক ব্যাকগ্রাউন্ডে ক্যান্ডি ক্যান ও হার্ট মোটিফ। লেন্থ ৩৭ ইঞ্চি, কোমর ২৬"-৩৪", হিপ ৩৬"-৪৬"।',
    descEn: 'Sweet candy cane patterned pajama pant in soft pink cotton. Length 37", waist 26"-34".'
  },
  {
    file: '099.jpg',
    id: 'pj-pant-polka-dot-lavender',
    name: 'Celestial Polka Dot Lavender Trouser Pant',
    nameBn: 'ল্যাভেন্ডার সেলেস্টিয়াল পোলকা ডট ট্রাউজার প্যান্ট',
    price: 290,
    originalPrice: 480,
    badge: 'Plus Size 48"',
    badgeBn: 'প্লাস সাইজ ৪৮"',
    isBestSeller: true,
    waist: '36"-48"',
    hip: '48"-60"',
    long: '38"',
    descBn: 'ল্যাভেন্ডার ব্লু পোলকা ডট ট্রাউজার প্যান্ট। লেন্থ ৩৮ ইঞ্চি, কোমর ৩৬"-৪৮", হিপ ৪৮"-৬০"। ঢিলেঢালা রিল্যাক্সড লাউঞ্জওয়্যার।',
    descEn: 'Lavender polka dot wide comfort lounge trouser pant. Length 38", waist 36"-48", hip 48"-60".'
  },
  {
    file: '102.jpg',
    id: 'pj-pant-tiger-stripe-comfort',
    name: 'Pastel Tiger Stripe Comfort Pajama Pant',
    nameBn: 'প্যাস্টেল টাইগার স্ট্রাইপড কমফোর্ট পায়জামা',
    price: 280,
    originalPrice: 450,
    badge: 'Trending Print',
    badgeBn: 'ট্রেন্ডিং প্রিন্ট',
    isBestSeller: false,
    waist: '34"-42"',
    hip: '43"-50"',
    long: '38"',
    descBn: 'প্যাস্টেল কালার শেডে ওয়াইল্ড ক্যাট ও টাইগার স্ট্রাইপ প্রিন্ট। লেন্থ ৩৮ ইঞ্চি, কোমর ৩৪"-৪২", হিপ ৪৩"-৫০"।',
    descEn: 'Modern pastel tiger stripe printed pajama pant. Length 38", waist 34"-42", hip 43"-50".'
  },
  {
    file: '103.jpg',
    id: 'pj-pant-heart-motif-navy',
    name: 'Classic White Heart Print Navy Pajama Pant',
    nameBn: 'হোয়াইট হার্ট প্রিন্ট নেভি পায়জামা প্যান্ট',
    price: 280,
    originalPrice: 450,
    badge: 'Comfort Fit',
    badgeBn: 'কমফোর্ট ফিট',
    isBestSeller: false,
    waist: '38"-46"',
    hip: '44"-48"',
    long: '38"',
    descBn: 'নেভি ব্লু কাপড়ে কিউট হোয়াইট হার্ট প্রিন্ট। লেন্থ ৩৮ ইঞ্চি, কোমর ৩৮"-৪৬", হিপ ৪৪"-৪৮"।',
    descEn: 'Navy blue pajama pant with scattered white heart print. Length 38", waist 38"-46".'
  },
  {
    file: '104.jpg',
    id: 'pj-pant-vertical-stripe-cozy',
    name: 'Clean Vertical Stripe Cozy Pajama Pant',
    nameBn: 'ক্লিন ভার্টিক্যাল স্ট্রাইপ কোজি পায়জামা প্যান্ট',
    price: 280,
    originalPrice: 450,
    badge: 'Classic Stripe',
    badgeBn: 'ক্লাসিক স্ট্রাইপ',
    isBestSeller: false,
    waist: '32"-42"',
    hip: '46"-52"',
    long: '38"',
    descBn: 'স্লেন্ডার ভার্টিক্যাল স্ট্রাইপড প্যাটার্ন। লেন্থ ৩৮ ইঞ্চি, কোমর ৩২"-৪২", হিপ ৪৬"-৫২"। ঘরে পরার জন্য দারুণ স্লিপ ট্রাউজার।',
    descEn: 'Clean vertical stripe sleep pajama pant. Length 38", waist 32"-42", hip 46"-52".'
  },
  {
    file: '105.jpg',
    id: 'pj-pant-whimsical-doodle',
    name: 'Whimsical Cartoon Doodle Pajama Pant',
    nameBn: 'হুইমসিক্যাল কার্টুন ডুডল পায়জামা প্যান্ট',
    price: 280,
    originalPrice: 450,
    badge: 'Cute Print',
    badgeBn: 'কিউট প্রিন্ট',
    isBestSeller: false,
    waist: '28"-40"',
    hip: '40"-50"',
    long: '37"',
    descBn: 'কার্টুন আর্ট প্রিন্ট সহ সফট কটন স্লিপ ট্রাউজার প্যান্ট। লেন্থ ৩৭ ইঞ্চি, কোমর ২৮"-৪০"।',
    descEn: 'Cartoon doodle print cotton sleep pant with relaxed cut and soft waistband.'
  },
  {
    file: '106.jpg',
    id: 'pj-pant-lace-hem-tiger',
    name: 'Lace Hem Accent Printed Pajama Pant',
    nameBn: 'লেইস হেম একসেন্ট প্রিন্টেড পায়জামা প্যান্ট',
    price: 290,
    originalPrice: 480,
    badge: 'Lace Hem Detail',
    badgeBn: 'লেইস হেম ডিটেইল',
    isBestSeller: true,
    waist: '28"-40"',
    hip: '40"-50"',
    long: '37"',
    descBn: 'পায়ের নিচে আকর্ষণীয় হোয়াইট লেইস বর্ডার ও প্রিমিয়াম প্রিন্টেড ফ্যাব্রিক। লেন্থ ৩৭ ইঞ্চি, কোমর ২৮"-৪০"।',
    descEn: 'Printed pajama pant featuring white lace trim at the ankle hem. Length 37", waist 28"-40".'
  }
];

// 4. Shorts (কটন লাউঞ্জ শর্টস - 100% Pure Cotton Summer Lounge Shorts)
// Price: ৳130 (regular ৳220 as shown in user screenshot 5: "SUMMER SHORTS 220 TK ❌ 130 TK ✅")
const shortsCatalog = [
  { file: '124.jpg', nameBn: 'পাম ট্রি সামার কটন শর্টস', nameEn: 'Palm Tree Summer Cotton Shorts', waist: '30"-36"', hip: '42"-46"', long: '13"' },
  { file: '125.jpg', nameBn: 'রেড রোজ ফ্লোরাল কটন শর্টস', nameEn: 'Red Rose Floral Cotton Shorts', waist: '32"-39"', hip: '46"-50"', long: '15"' },
  { file: '128.jpg', nameBn: 'নূজ কোজি লাউঞ্জ শর্টস', nameEn: 'Nooze Cozy Lounge Shorts', waist: '32"-42"', hip: '48"-56"', long: '14"' },
  { file: '129.jpg', nameBn: 'সুইট ব্লু ফ্লোরাল স্লিপ শর্টস', nameEn: 'Sweet Blue Floral Sleep Shorts', waist: '32"-40"', hip: '48"-56"', long: '13"' },
  { file: '130.jpg', nameBn: 'মেরিন ক্র্যাব ও ওশান শর্টস', nameEn: 'Marine Ocean & Crab Print Shorts', waist: '30"-38"', hip: '44"-54"', long: '14"' },
  { file: '131.jpg', nameBn: 'ইয়েলো ব্লোসম ফ্লোরাল শর্টস', nameEn: 'Yellow Blossom Floral Shorts', waist: '36"-40"', hip: '44"-48"', long: '14"' },
  { file: '132.jpg', nameBn: 'কমফোর্ট ফিট ব্রেথেবল শর্টস', nameEn: 'Comfort Fit Breathable Shorts', waist: '32"-40"', hip: '48"-54"', long: '13"' },
  { file: '133.jpg', nameBn: 'রেড হার্ট রাফেল হেম শর্টস', nameEn: 'Red Heart Ruffle Hem Shorts', waist: '28"-36"', hip: '44"-52"', long: '14"' },
  { file: '134.jpg', nameBn: 'লং কাট পিওর কটন লাউঞ্জ শর্টস', nameEn: 'Long Cut Pure Cotton Lounge Shorts', waist: '30"-38"', hip: '46"-54"', long: '15"' },
  { file: '135.jpg', nameBn: 'সফট লেইস হেম স্লিপ শর্টস', nameEn: 'Soft Lace Hem Sleep Shorts', waist: '28"-34"', hip: '44"-54"', long: '13"' },
  { file: '136.jpg', nameBn: 'পিঙ্ক হার্ট লেইস ট্রিম শর্টস', nameEn: 'Pink Heart Lace Trim Shorts', waist: '32"-38"', hip: '54"-62"', long: '13"' },
  { file: '137.jpg', nameBn: 'এক্সট্রা কমফোর্ট লং লাউঞ্জ শর্টস', nameEn: 'Extra Comfort Long Lounge Shorts', waist: '28"-36"', hip: '46"-54"', long: '16"' },
  { file: '138.jpg', nameBn: 'প্যাস্টেল স্ট্রাইপড স্লিপ শর্টস', nameEn: 'Pastel Striped Sleep Shorts', waist: '30"-34"', hip: '42"-52"', long: '13"' },
  { file: '139.jpg', nameBn: 'মিনি পকেট কটন লাউঞ্জ শর্টস', nameEn: 'Mini Pocket Cotton Lounge Shorts', waist: '26"-30"', hip: '38"-46"', long: '12"' },
  { file: '140.jpg', nameBn: 'হোয়াইট বোটানিক্যাল কটন শর্টস', nameEn: 'White Botanical Cotton Shorts', waist: '30"-36"', hip: '40"-58"', long: '13"' },
  { file: '141.jpg', nameBn: 'সামার ড্র-স্ট্রিং কটন শর্টস', nameEn: 'Summer Drawstring Cotton Shorts', waist: '30"-38"', hip: '41"-48"', long: '11"' },
  { file: '142.jpg', nameBn: 'রিল্যাক্সড স্লিপ কটন শর্টস', nameEn: 'Relaxed Sleep Cotton Shorts', waist: '30"-38"', hip: '46"-50"', long: '14"' },
  { file: '143.jpg', nameBn: 'ডাস্টি রোজ কটন লাউঞ্জ শর্টস', nameEn: 'Dusty Rose Cotton Lounge Shorts', waist: '32"-38"', hip: '46"-54"', long: '12"' },
  { file: '144.jpg', nameBn: 'ফ্রি স্টাইল ব্রিদিং কটন শর্টস', nameEn: 'Free Style Breathing Cotton Shorts', waist: '30"-36"', hip: '46"-60"', long: '11"' },
  { file: '145.jpg', nameBn: 'পীচ ফ্লোরাল গার্ডেন শর্টস', nameEn: 'Peach Floral Garden Shorts', waist: '32"-38"', hip: '46"-50"', long: '14"' },
  { file: '146.jpg', nameBn: 'ক্লাসিক হাই-রাইজ কটন শর্টস', nameEn: 'Classic High-Rise Cotton Shorts', waist: '28"-36"', hip: '44"-50"', long: '15"' },
  { file: '147.jpg', nameBn: 'লাইটওয়েট সামার স্লিপ শর্টস', nameEn: 'Lightweight Summer Sleep Shorts', waist: '28"-34"', hip: '40"-48"', long: '12"' },
  { file: '148.jpg', nameBn: 'পোলকা ডট চারকোল শর্টস', nameEn: 'Polka Dot Charcoal Shorts', waist: '28"-34"', hip: '36"-40"', long: '11"' },
  { file: '149.jpg', nameBn: 'অর্গানিক সফট কটন শর্টস', nameEn: 'Organic Soft Cotton Shorts', waist: '28"-34"', hip: '38"-42"', long: '13"' },
  { file: '150.jpg', nameBn: 'কফি মোকা পিওর কটন শর্টস', nameEn: 'Coffee Mocha Pure Cotton Shorts', waist: '26"-36"', hip: '38"-42"', long: '10"' },
  { file: '151.jpg', nameBn: 'ল্যাভেন্ডার ড্রিম কটন শর্টস', nameEn: 'Lavender Dream Cotton Shorts', waist: '28"-34"', hip: '46"-50"', long: '13"' },
  { file: '152.jpg', nameBn: 'মিন্ট কুল ব্রিজ কটন শর্টস', nameEn: 'Mint Cool Breeze Cotton Shorts', waist: '30"-34"', hip: '40"-50"', long: '11"' },
  { file: '153.jpg', nameBn: 'ডুও-টোন রিল্যাক্সড লাউঞ্জ শর্টস', nameEn: 'Duo-Tone Relaxed Lounge Shorts', waist: '32"-40"', hip: '44"-52"', long: '14"' },
  { file: '154.jpg', nameBn: 'অলিভ সেজ গার্ডেন শর্টস', nameEn: 'Olive Sage Garden Shorts', waist: '32"-40"', hip: '44"-52"', long: '14"' },
  { file: '155.jpg', nameBn: 'মেরুন ওয়াইন কোজি শর্টস', nameEn: 'Maroon Wine Cozy Shorts', waist: '32"-38"', hip: '40"-48"', long: '12"' },
  { file: '156.jpg', nameBn: 'প্লাস ফিট পিওর কটন শর্টস', nameEn: 'Plus Fit Pure Cotton Shorts', waist: '34"-42"', hip: '44"-54"', long: '12"' },
  { file: '157.jpg', nameBn: 'আল্ট্রা স্ট্রেচ মেগা প্লাস শর্টস', nameEn: 'Ultra Stretch Mega Plus Shorts', waist: '36"-48"', hip: '50"-60"', long: '12"' }
];

// Swatch colors for shorts
const SHORTS_COLORS = [
  { name: 'Dusty Rose', nameBn: 'ডাস্টি রোজ', hex: '#D88A8A' },
  { name: 'Sage Green', nameBn: 'সেজ গ্রিন', hex: '#8EAA90' },
  { name: 'Lavender Mist', nameBn: 'ল্যাভেন্ডার', hex: '#B899C2' },
  { name: 'Baby Pink', nameBn: 'বেবি পিঙ্ক', hex: '#F7C5CC' },
  { name: 'Sky Blue', nameBn: 'স্কাই ব্লু', hex: '#93C5FD' },
  { name: 'Jet Black', nameBn: 'জেট ব্ল্যাক', hex: '#1E293B' },
  { name: 'Heather Grey', nameBn: 'হেদার গ্রে', hex: '#94A3B8' },
  { name: 'Peach Coral', nameBn: 'পীচ কোরাল', hex: '#FB923C' },
  { name: 'Coffee Mocha', nameBn: 'কফি মোকা', hex: '#78350F' },
  { name: 'Wine Maroon', nameBn: 'ওয়াইন মেরুন', hex: '#881337' },
  { name: 'Navy Blue', nameBn: 'নেভি ব্লু', hex: '#1E3A8A' },
  { name: 'Mint Green', nameBn: 'মিন্ট গ্রিন', hex: '#6EE7B7' }
];

// Generate products array
const products = [];

// 1. Add PJ Shirts
pjShirtsData.forEach((p, idx) => {
  products.push({
    id: p.id,
    name: p.name,
    nameBn: p.nameBn,
    category: 'pj-shirts',
    categoryLabelBn: 'পিজে স্লিপ শার্ট 🎀',
    price: p.price,
    originalPrice: p.originalPrice,
    fabric: '100% Export Soft Cotton (Collar & Front Buttons)',
    gsm: 175,
    chestSize: p.chest,
    lengthSize: p.length,
    availableSizes: ['Regular', 'Free Size'],
    colors: [
      { name: 'Classic Stripe / Print', nameBn: 'ক্লাসিক স্ট্রাইপ / প্রিন্ট', hex: '#1E293B' },
      { name: 'Soft Pastel Tone', nameBn: 'সফট প্যাস্টেল টোন', hex: '#FBCFE8' }
    ],
    inStock: true,
    stockCount: 15,
    rating: 4.9,
    reviewCount: 42 + idx * 8,
    image: `/assets/products/${p.file}`,
    galleryImages: getGalleryImages(p.file),
    description: p.descEn,
    descriptionBn: p.descBn,
    badge: p.badge,
    badgeBn: p.badgeBn,
    isBestSeller: p.isBestSeller
  });
});

// 2. Add Panties / Underwear
pantiesData.forEach((p, idx) => {
  products.push({
    id: p.id,
    name: p.name,
    nameBn: p.nameBn,
    category: 'panties',
    categoryLabelBn: 'প্যান্টি ও ইনারওয়্যার 🌸',
    price: p.price,
    originalPrice: p.originalPrice,
    fabric: '100% Cotton & Floral Lace (Hypoallergenic Gusset)',
    gsm: 160,
    chestSize: 'N/A',
    lengthSize: 'Comfort Brief / Low-Rise Thong',
    availableSizes: p.id.includes('xl') ? ['Plus Size (38-46)'] : ['Regular', 'Free Size'],
    colors: [
      { name: 'Blush & Heather', nameBn: 'ব্লাশ ও হেদার', hex: '#D88A8A' },
      { name: 'Soft Neutral', nameBn: 'সফট নিউট্রাল', hex: '#E2E8F0' },
      { name: 'Black Lace', nameBn: 'ব্ল্যাক লেইস', hex: '#0F172A' }
    ],
    inStock: true,
    stockCount: 25,
    rating: 4.8,
    reviewCount: 38 + idx * 7,
    image: `/assets/products/${p.file}`,
    galleryImages: getGalleryImages(p.file),
    description: p.descEn,
    descriptionBn: p.descBn,
    badge: p.badge,
    badgeBn: p.badgeBn,
    isBestSeller: p.isBestSeller
  });
});

// 3. Add Pajama Pants
pajamasData.forEach((p, idx) => {
  products.push({
    id: p.id,
    name: p.name,
    nameBn: p.nameBn,
    category: 'pajamas',
    categoryLabelBn: 'পায়জামা ও ট্রাউজার প্যান্ট',
    price: p.price,
    originalPrice: p.originalPrice,
    fabric: '100% Breathable Cotton (Drawstring Waist)',
    gsm: 180,
    chestSize: 'Waist: ' + p.waist + ', Hip: ' + p.hip,
    lengthSize: p.long + ' inch',
    availableSizes: p.waist.includes('44') || p.waist.includes('48') ? ['Plus Size (38-46)', 'Free Size'] : ['Regular', 'Free Size'],
    colors: [
      { name: 'Character / Motif Print', nameBn: 'প্রিন্টেড ডিজাইন', hex: '#F472B6' },
      { name: 'Cozy Neutral Tone', nameBn: 'কোজি নিউট্রাল টোন', hex: '#64748B' }
    ],
    inStock: true,
    stockCount: 18,
    rating: 4.9,
    reviewCount: 55 + idx * 6,
    image: `/assets/products/${p.file}`,
    galleryImages: getGalleryImages(p.file),
    description: p.descEn,
    descriptionBn: p.descBn,
    badge: p.badge,
    badgeBn: p.badgeBn,
    isBestSeller: p.isBestSeller
  });
});

// 4. Add Lounge Shorts (with ৳130 offer price as per user screenshot)
shortsCatalog.forEach((s, idx) => {
  products.push({
    id: 'shorts-' + s.file.replace('.jpg', ''),
    name: s.nameEn,
    nameBn: s.nameBn,
    category: 'shorts',
    categoryLabelBn: 'কটন লাউঞ্জ শর্টস (৳১৩০)',
    price: 130,
    originalPrice: 220,
    fabric: '100% Pure Soft Cotton (Drawstring & Elastic Waist)',
    gsm: 170,
    chestSize: 'Waist: ' + s.waist + ', Hip: ' + s.hip,
    lengthSize: s.long + ' inch',
    availableSizes: s.waist.includes('40') || s.waist.includes('48') ? ['Regular', 'Plus Size (38-46)', 'Free Size'] : ['Regular', 'Free Size'],
    colors: SHORTS_COLORS.slice((idx * 2) % 6, ((idx * 2) % 6) + 4),
    inStock: true,
    stockCount: 20,
    rating: 4.9,
    reviewCount: 40 + (idx % 15) * 5,
    image: `/assets/products/${s.file}`,
    galleryImages: getGalleryImages(s.file),
    description: `100% Pure cotton breathable summer lounge shorts. Waist: ${s.waist}, Hip: ${s.hip}, Length: ${s.long}". Soft elastic with adjustable drawstring.`,
    descriptionBn: `১০০% পিওর কটন ব্রেথেবল সামার লাউঞ্জ শর্টস। কোমর: ${s.waist}, হিপ: ${s.hip}, ঝুল (লেন্থ): ${s.long} ইঞ্চি। ড্র-স্ট্রিং ও আরামদায়ক ইলাস্টিক কোমর। গরমে ঘরে পরার জন্য অতুলনীয় প্রশান্তি। ২২০৳ এর অফার মাত্র ১৩০৳!`,
    badge: idx === 0 ? 'Dhamaka ৳130' : (idx < 5 ? 'Popular' : undefined),
    badgeBn: idx === 0 ? 'ধামাকা অফার ১৩০৳' : (idx < 5 ? 'জনপ্রিয়' : undefined),
    isBestSeller: idx < 6
  });
});

// 5. Special Combos & Sets (Based on user uploaded screenshots!)
const combosData = [
  {
    id: 'combo-3-summer-shorts',
    name: '3-Piece Summer Cotton Shorts Saver Combo',
    nameBn: '৩টি সামার কটন শর্টস সুপার সেভার কম্বো',
    category: 'combos',
    categoryLabelBn: 'স্পেশাল কম্বো অফার 🔥',
    price: 360,
    originalPrice: 660,
    fabric: '100% Pure Cotton (Choose Any 3 Prints/Colors)',
    gsm: 170,
    chestSize: 'Waist: 26"-40" Free Size',
    lengthSize: '12"-14" inch',
    availableSizes: ['Free Size', 'Regular', 'Plus Size (38-46)'],
    colors: SHORTS_COLORS.slice(0, 5),
    inStock: true,
    stockCount: 30,
    rating: 5.0,
    reviewCount: 168,
    image: '/assets/products/130.jpg',
    galleryImages: ['/assets/products/130.jpg', '/assets/products/124.jpg', '/assets/products/133.jpg'],
    description: 'Secret Style BD special combo: 3 pure cotton summer lounge shorts for only ৳360 (regular ৳660). Pick your favorite designs, mix and match.',
    descriptionBn: 'সিক্রেট স্টাইল বিডি স্পেশাল ধামাকা কম্বো: ৩টি পিওর কটন সামার শর্টস মাত্র ৩৬০৳ (রেগুলার ৬৬০৳)! আপনার পছন্দের কালার ও প্রিন্ট বেছে নিন। ক্যাশ অন ডেলিভারি সারা দেশে।',
    badge: 'Best Value 3-Pack',
    badgeBn: 'বেস্ট ভ্যালু ৩টি কম্বো',
    isBestSeller: true
  },
  {
    id: 'combo-crop-tshirt-shorts-set',
    name: 'Premium Crop Fit T-Shirt + Shorts 2-Piece Set',
    nameBn: 'প্রিমিয়াম ক্রপ ফিট টি-শার্ট + শর্টস ২-পিস সেট',
    category: 'combos',
    categoryLabelBn: 'স্পেশাল সেট অফার 🔥',
    price: 380,
    originalPrice: 650,
    fabric: 'Soft Cotton Rib & Interlock Jersey',
    gsm: 190,
    chestSize: 'Top Body: 32"-38", Waist: 26"-36"',
    lengthSize: 'Top: 18", Shorts: 13"',
    availableSizes: ['Regular', 'Free Size'],
    colors: [
      { name: 'Navy Blue Set', nameBn: 'নেভি ব্লু সেট', hex: '#1E3A8A' },
      { name: 'White & Crimson', nameBn: 'হোয়াইট ও ক্রিমসন', hex: '#BE123C' }
    ],
    inStock: true,
    stockCount: 15,
    rating: 4.9,
    reviewCount: 94,
    image: '/assets/products/112.jpg',
    galleryImages: ['/assets/products/112.jpg', '/assets/products/109.jpg'],
    description: 'Trendy crop fit sporty t-shirt + matching athletic lounge shorts summer set for only ৳380. Perfect for casual, college, and home relaxation.',
    descriptionBn: 'ট্রেন্ডি স্পোর্টি ক্রপ ফিট টি-শার্ট ও ম্যাচিং সামার শর্টস কমপ্লিট সেট মাত্র ৩৮০৳ (যেমন সিক্রেট স্টাইল বিডি অফিসিয়াল ফেসবুক পোস্ট)! স্টাইলিশ ও দারুণ আরামদায়ক।',
    badge: 'Full Set ৳380',
    badgeBn: 'ফুল সেট ৩৮০৳',
    isBestSeller: true
  },
  {
    id: 'combo-pj-shirt-and-pant-set',
    name: 'Export PJ Button Shirt + Pajama Pant Complete Set',
    nameBn: 'এক্সপোর্ট পিজে বাটন শার্ট + পায়জামা প্যান্ট লাউঞ্জ সেট',
    category: 'combos',
    categoryLabelBn: 'কমপ্লিট স্লিপ সেট 🔥',
    price: 490,
    originalPrice: 850,
    fabric: '100% Export Quality Soft Cotton',
    gsm: 180,
    chestSize: 'Shirt Chest: 32"-38", Pant Waist: 26"-38"',
    lengthSize: 'Shirt: 24", Pant: 37"',
    availableSizes: ['Regular', 'Plus Size (38-46)', 'Free Size'],
    colors: [
      { name: 'Striped & Pink Pajama', nameBn: 'স্ট্রাইপড ও পিঙ্ক পায়জামা', hex: '#F472B6' },
      { name: 'Classic Navy Motif', nameBn: 'ক্লাসিক নেভি মোটিফ', hex: '#1E293B' }
    ],
    inStock: true,
    stockCount: 18,
    rating: 5.0,
    reviewCount: 112,
    image: '/assets/products/112.jpg',
    galleryImages: ['/assets/products/112.jpg', '/assets/products/100.jpg', '/assets/products/096.jpg'],
    description: 'Export quality button-down PJ sleep shirt + matching soft printed cotton pajama pant for only ৳490. Complete everyday luxury sleep set.',
    descriptionBn: 'এক্সপোর্ট কোয়ালিটি বাটন-ডাউন পিজে স্লিপ শার্ট + ১০০% সফট কটন প্রিন্টেড পায়জামা প্যান্টের কমপ্লিট সেট মাত্র ৪৯০৳।',
    badge: 'Super Saver Set',
    badgeBn: 'সুপার সেভার সেট',
    isBestSeller: true
  },
  {
    id: 'combo-4-thong-panty-box',
    name: '4-Piece Premium Lace & Cotton Panty Multi-Pack',
    nameBn: '৪টি প্রিমিয়াম লেইস ও কটন প্যান্টি মাল্টি-প্যাক',
    category: 'combos',
    categoryLabelBn: 'ইনারওয়্যার কম্বো 🌸',
    price: 399,
    originalPrice: 650,
    fabric: '100% Cotton & Floral Lace (Hypoallergenic Gusset)',
    gsm: 160,
    chestSize: 'Waist: 28"-40" Free & XL Size',
    lengthSize: 'Comfort Fit',
    availableSizes: ['Free Size', 'Regular', 'Plus Size (38-46)'],
    colors: [
      { name: 'Assorted Pastels & Black', nameBn: 'প্যাস্টেল ও ব্ল্যাক মিক্স', hex: '#D88A8A' }
    ],
    inStock: true,
    stockCount: 22,
    rating: 4.9,
    reviewCount: 88,
    image: '/assets/products/094.jpg',
    galleryImages: ['/assets/products/094.jpg', '/assets/products/095.jpg', '/assets/products/107.jpg', '/assets/products/118.jpg'],
    description: 'Secret Style BD premium 4-piece panty collection: soft breathable cotton and floral lace panties with gentle elastic for only ৳399.',
    descriptionBn: '৪টি প্রিমিয়াম সফট কটন ও ফ্লোরাল লেইস প্যান্টির স্পেশাল কম্বো প্যাক মাত্র ৩৯৯৳। সেনসিটিভ স্কিনের জন্য শতভাগ নিরাপদ ও নরম।',
    badge: '4-Pack Special',
    badgeBn: '৪টি স্পেশাল বক্স',
    isBestSeller: true
  },
  {
    id: 'combo-5-shorts-mega-pack',
    name: '5-Piece Cotton Summer Shorts Mega Pack (Free Shipping)',
    nameBn: '৫টি কটন সামার শর্টস মেগা প্যাক (ফ্রি ডেলিভারি)',
    category: 'combos',
    categoryLabelBn: 'মেগা ধামাকা অফার 🔥',
    price: 590,
    originalPrice: 1100,
    fabric: '100% Pure Cotton (5 Distinct Prints & Colors)',
    gsm: 170,
    chestSize: 'Waist: 26"-42" Free Size',
    lengthSize: '12"-14" inch',
    availableSizes: ['Free Size', 'Regular', 'Plus Size (38-46)'],
    colors: SHORTS_COLORS.slice(0, 6),
    inStock: true,
    stockCount: 25,
    rating: 5.0,
    reviewCount: 215,
    image: '/assets/products/136.jpg',
    galleryImages: ['/assets/products/136.jpg', '/assets/products/128.jpg', '/assets/products/131.jpg'],
    description: '5 premium pure cotton summer lounge shorts for only ৳590 plus free home delivery. Ultimate family & friends sleepwear bundle.',
    descriptionBn: '৫টি প্রিমিয়াম পিওর কটন সামার শর্টস মেগা প্যাক মাত্র ৫৯০৳ সাথে ফ্রি হোম ডেলিভারি! ৫টি ভিন্ন প্রিন্ট ও কালার শেড।',
    badge: 'Free Delivery 🚚',
    badgeBn: 'ফ্রি ডেলিভারি 🚚',
    isBestSeller: true
  }
];

combosData.forEach(c => products.push(c));

console.log(`Generated ${products.length} products total.`);
console.log('Categories breakdown:');
const counts = {};
products.forEach(p => counts[p.category] = (counts[p.category] || 0) + 1);
console.log(counts);

// Generate TypeScript code
const tsContent = `import { Product, ProductColor } from '../types';

export const SHORTS_COLORS: ProductColor[] = ${JSON.stringify(SHORTS_COLORS, null, 2)};

export const PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};
`;

fs.writeFileSync('src/data/products.ts', tsContent, 'utf8');
console.log('Successfully wrote src/data/products.ts');
