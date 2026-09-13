import { Product, ProductColor } from '../types';
export * from './reviews';

export const SHORTS_COLORS: ProductColor[] = [
  { "name": "Dusty Rose", "nameBn": "ডাস্টি রোজ", "hex": "#D88A8A" },
  { "name": "Sage Green", "nameBn": "সেজ গ্রিন", "hex": "#8EAA90" },
  { "name": "Lavender Mist", "nameBn": "ল্যাভেন্ডার", "hex": "#B899C2" },
  { "name": "Baby Pink", "nameBn": "বেবি পিঙ্ক", "hex": "#F7C5CC" },
  { "name": "Sky Blue", "nameBn": "স্কাই ব্লু", "hex": "#A2C4D9" },
  { "name": "Mocha Heather", "nameBn": "মোকা হেদার", "hex": "#B5A496" },
  { "name": "Midnight Charcoal", "nameBn": "চারকোল ব্ল্যাক", "hex": "#3A3839" },
  { "name": "Peach Whip", "nameBn": "পিচ হুইপ", "hex": "#FAD4C0" }
];

export const PRODUCTS: Product[] = [
  {
    "id": "pj-shirt-primark-stripes",
    "name": "Primark Cares Striped PJ Sleep Shirt",
    "nameBn": "প্রাইমার্ক কেয়ার্স স্ট্রাইপড পিজে স্লিপ শার্ট",
    "category": "pj-shirts",
    "categoryLabelBn": "পিজে স্লিপ শার্ট 🎀",
    "price": 250,
    "originalPrice": 450,
    "fabric": "100% Export Soft Cotton (Collar & Front Buttons)",
    "gsm": 175,
    "chestSize": "32\"-36\"",
    "lengthSize": "24\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Classic Black & White Stripe",
        "nameBn": "ব্ল্যাক অ্যান্ড হোয়াইট স্ট্রাইপ",
        "hex": "#1E293B"
      }
    ],
    "inStock": true,
    "stockCount": 25,
    "rating": 4.9,
    "reviewCount": 78,
    "image": "/assets/products/112.jpg",
    "galleryImages": [
      "/assets/products/112.jpg",
      "/assets/products/109.jpg",
      "/assets/products/110.jpg",
      "/assets/products/111.jpg"
    ],
    "description": "Original Primark Cares 2XS export quality button-down PJ sleep shirt. Features notched lapel collar, front button closure, chest pocket, and piping finish on 100% breathable soft cotton fabric.",
    "descriptionBn": "অরিজিনাল প্রাইমার্ক কেয়ার্স (Primark Cares 2XS) এক্সপোর্ট কোয়ালিটি বাটন-ডাউন পিজে স্লিপ শার্ট। নচড ল্যাপেল কলার, সামনে সুন্দর বোতাম, ফ্রন্ট পকেট ও পাইপিং ফিনিশিং সহ ১০০% প্রিমিয়াম সুতি ফেব্রিক। ছবিতে প্রদর্শিত ৪টি ভিন্ন কোণ থেকে শার্টের নিখুঁত ফিনিশিং ও লেবেল দেখুন।",
    "badge": "Special Offer ৳250",
    "badgeBn": "স্পেশাল অফার ২৫০৳",
    "isBestSeller": true
  },
  {
    "id": "pj-shirt-matalan-citrus",
    "name": "Matalan Be Beau UK Summer Citrus PJ Shirt",
    "nameBn": "মাতালান ইউকে সামার সিট্রাস প্রিন্ট পিজে স্লিপ শার্ট",
    "category": "pj-shirts",
    "categoryLabelBn": "পিজে স্লিপ শার্ট 🎀",
    "price": 250,
    "originalPrice": 450,
    "fabric": "100% Export Soft Cotton (Collar & Front Buttons)",
    "gsm": 175,
    "chestSize": "36\"-40\" (Size L)",
    "lengthSize": "25\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Summer Citrus & Sunshine",
        "nameBn": "সামার সিট্রাস ও সানশাইন",
        "hex": "#F59E0B"
      }
    ],
    "inStock": true,
    "stockCount": 20,
    "rating": 4.9,
    "reviewCount": 64,
    "image": "/assets/products/113.jpg",
    "galleryImages": [
      "/assets/products/113.jpg",
      "/assets/products/114.jpg"
    ],
    "description": "Matalan UK Be Beau ladies size L export pajama sleep shirt. Adorable summer theme print with citrus slices, sunshine motifs, and front button-down collar.",
    "descriptionBn": "মাতালান ইউকে (Matalan Be Beau UK Size L) লেডিস স্লিপ শার্ট। কিউট সামার সিট্রাস, লেবু ও সানশাইন প্রিন্ট। সামনে বোতাম ও কলার ফিনিশিং—ঘরে পরা বা ঘুমের জন্য ১০০% আরামদায়ক এক্সপোর্ট কোয়ালিটি।",
    "badge": "Export Quality",
    "badgeBn": "এক্সপোর্ট কোয়ালিটি",
    "isBestSeller": true
  },
  {
    "id": "panty-pure-cotton-sensitive",
    "name": "100% Pure Cotton Sensitive Skin Panties (Assorted)",
    "nameBn": "১০০% পিওর কটন সেনসিটিভ স্কিন প্যান্টি প্যাক",
    "category": "panties",
    "categoryLabelBn": "প্যান্টি কালেকশন 🌸",
    "price": 140,
    "originalPrice": 220,
    "fabric": "100% Pure Combed Cotton (Hypoallergenic)",
    "gsm": 180,
    "chestSize": "Free Size (Waist: 28\"-38\")",
    "lengthSize": "Full Coverage",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Floral & Heart Assortment",
        "nameBn": "ফ্লোরাল ও হার্ট প্যাস্টেল",
        "hex": "#F472B6"
      },
      {
        "name": "Soft Heather Grey & Black",
        "nameBn": "হেদার গ্রে ও ব্ল্যাক",
        "hex": "#94A3B8"
      }
    ],
    "inStock": true,
    "stockCount": 45,
    "rating": 5,
    "reviewCount": 92,
    "image": "/assets/products/094.jpg",
    "galleryImages": [
      "/assets/products/094.jpg",
      "/assets/products/095.jpg"
    ],
    "description": "100% pure combed cotton panties specially designed for sensitive skin. Breathable, sweat-absorbent, ultra-soft, and free from harsh elastic marks.",
    "descriptionBn": "১০০% পিওর কম্বড কটন সেনসিটিভ স্কিন প্যান্টি। নরম ও ব্রেথেবল ফেব্রিক, ইলাস্টিকের কোনো দাগ বা ইরিটেশন ফেলে না। সারাদিনের স্বস্তি ও পরিচ্ছন্নতার জন্য সেরা পছন্দ।",
    "badge": "Safe For Sensitive Skin",
    "badgeBn": "সেনসিটিভ স্কিন সেফ",
    "isBestSeller": true
  },
  {
    "id": "panty-lace-comfort-xl",
    "name": "Secret Style BD Floral Lace Comfort Panty (XL Size)",
    "nameBn": "এক্সএল ফ্লোরাল লেইস পিওর কমফোর্ট প্যান্টি",
    "category": "panties",
    "categoryLabelBn": "প্যান্টি কালেকশন 🌸",
    "price": 140,
    "originalPrice": 220,
    "fabric": "Soft Stretch Cotton & Floral Lace",
    "gsm": 180,
    "chestSize": "XL Size (Waist: 34\"-42\")",
    "lengthSize": "Mid-Rise Comfort",
    "availableSizes": [
      "Plus Size (38-46)",
      "Regular"
    ],
    "colors": [
      {
        "name": "Lilac Floral Lace",
        "nameBn": "লাইলাক ফ্লোরাল লেইস",
        "hex": "#C084FC"
      }
    ],
    "inStock": true,
    "stockCount": 30,
    "rating": 4.8,
    "reviewCount": 56,
    "image": "/assets/products/107.jpg",
    "galleryImages": [
      "/assets/products/107.jpg",
      "/assets/products/108.jpg"
    ],
    "description": "Secret Style BD XL size soft stretch cotton panty with delicate floral lace applique. Comfortable waistband and breathable gusset.",
    "descriptionBn": "সিক্রেট স্টাইল বিডি এক্সএল (XL Size) ফ্লোরাল লেইস আরামদায়ক প্যান্টি। সফট স্ট্রেচ কটন ও নরম লেইস ডিজাইন। কোমর মাপ ৩৪\" থেকে ৪২\" পর্যন্ত পারফেক্ট ফিটিং।",
    "badge": "XL Size Lace",
    "badgeBn": "এক্সএল সাইজ লেইস"
  },
  {
    "id": "panty-wednesday-edition-l",
    "name": "Wednesday Edition Soft Graphic & Lace Panty (L Size)",
    "nameBn": "ওয়েডনেসডে এডিশন সফট কমফোর্ট প্যান্টি (L)",
    "category": "panties",
    "categoryLabelBn": "প্যান্টি কালেকশন 🌸",
    "price": 130,
    "originalPrice": 200,
    "fabric": "100% Breathable Soft Cotton",
    "gsm": 175,
    "chestSize": "L Size (Waist: 30\"-36\")",
    "lengthSize": "Hipster Comfort",
    "availableSizes": [
      "Regular"
    ],
    "colors": [
      {
        "name": "Wednesday Sky Blue",
        "nameBn": "ওয়েডনেসডে স্কাই ব্লু",
        "hex": "#38BDF8"
      },
      {
        "name": "Wednesday Heather Charcoal",
        "nameBn": "ওয়েডনেসডে চারকোল",
        "hex": "#64748B"
      }
    ],
    "inStock": true,
    "stockCount": 28,
    "rating": 4.8,
    "reviewCount": 47,
    "image": "/assets/products/115.jpg",
    "galleryImages": [
      "/assets/products/115.jpg",
      "/assets/products/119.jpg"
    ],
    "description": "Wednesday graphic series soft cotton hipster panty in size L with comfortable elasticated waistband.",
    "descriptionBn": "ওয়েডনেসডে সিরিজ সফট কটন হিপস্টার প্যান্টি (L সাইজ)। আরামদায়ক সফট ওয়েস্টব্যান্ড ও ব্রিদিং কটন ফেব্রিক। কোমর ৩০\" থেকে ৩৬\" এর জন্য পারফেক্ট।",
    "badge": "Wednesday Edition",
    "badgeBn": "ওয়েডনেসডে কালেকশন"
  },
  {
    "id": "panty-lace-side-black-l",
    "name": "Secret Style BD Lace Side Panel Panty (Midnight Black L)",
    "nameBn": "ব্ল্যাক লেইস সাইড প্যানেল কমফোর্ট প্যান্টি (L)",
    "category": "panties",
    "categoryLabelBn": "প্যান্টি কালেকশন 🌸",
    "price": 130,
    "originalPrice": 200,
    "fabric": "Breathable Stretch Cotton & Lace",
    "gsm": 175,
    "chestSize": "L Size (Waist: 30\"-36\")",
    "lengthSize": "Bikini Cut",
    "availableSizes": [
      "Regular"
    ],
    "colors": [
      {
        "name": "Midnight Black Lace",
        "nameBn": "মিডনাইট ব্ল্যাক লেইস",
        "hex": "#0F172A"
      }
    ],
    "inStock": true,
    "stockCount": 22,
    "rating": 4.9,
    "reviewCount": 38,
    "image": "/assets/products/118.jpg",
    "galleryImages": [
      "/assets/products/118.jpg"
    ],
    "description": "Elegant solid black breathable cotton panty with delicate lace side panels for supreme everyday comfort.",
    "descriptionBn": "সিক্রেট স্টাইল বিডি মিডনাইট ব্ল্যাক লেইস সাইড প্যানেল প্যান্টি (L সাইজ)। সফট ব্রিদেবল কটন ফেব্রিক ও প্রিমিয়াম লেইস ডিজাইন।",
    "badge": "Lace Panel",
    "badgeBn": "লেইস প্যানেল"
  },
  {
    "id": "pj-pant-cat-line-art",
    "name": "Whimsical Cat Line-Art Oatmeal Pajama Pant",
    "nameBn": "সফট পিঙ্ক কিউট ক্যাট প্রিন্ট লেইস পায়জামা প্যান্ট",
    "category": "pajamas",
    "categoryLabelBn": "পায়জামা ও ট্রাউজার",
    "price": 280,
    "originalPrice": 480,
    "fabric": "100% Export Soft Cotton (Lace Trim Hem)",
    "gsm": 180,
    "chestSize": "Waist: 28\"-36\", Hip: 40\"-48\"",
    "lengthSize": "Long: 36\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Cat Line Art Pink",
        "nameBn": "ক্যাট লাইন আর্ট পিঙ্ক",
        "hex": "#FBCFE8"
      }
    ],
    "inStock": true,
    "stockCount": 18,
    "rating": 4.9,
    "reviewCount": 58,
    "image": "/assets/products/096.jpg",
    "galleryImages": [
      "/assets/products/096.jpg",
      "/assets/products/105.jpg"
    ],
    "description": "Cute whimsical black line-art cats on soft pink pure cotton fabric with delicate white lace trim at the hem. Waist: 28\" to 36\", Hip: 40\" to 48\", Long: 36\".",
    "descriptionBn": "সফট পিঙ্ক পিওর সুতি কাপড়ে কিউট ক্যাট লাইন-আর্ট প্রিন্ট ও নিচে আকর্ষণীয় সাদা লেইস বর্ডার। কোমর: ২৮\" থেকে ৩৬\", হিপ: ৪০\" থেকে ৪৮\", ঝুল: ৩৬\"।",
    "badge": "100% Pure Cotton",
    "badgeBn": "১০০% পিওর কটন",
    "isBestSeller": true
  },
  {
    "id": "pj-pant-tiger-stripe-comfort",
    "name": "Pastel Tiger Stripe Comfort Pajama Pant",
    "nameBn": "পিঙ্ক টাইগার স্ট্রাইপ লেইস ট্রাউজার প্যান্ট",
    "category": "pajamas",
    "categoryLabelBn": "পায়জামা ও ট্রাউজার",
    "price": 290,
    "originalPrice": 480,
    "fabric": "100% Soft Breathable Cotton (Lace Trim Hem)",
    "gsm": 185,
    "chestSize": "Waist: 34\"-42\", Hip: 43\"-50\"",
    "lengthSize": "Long: 38\"",
    "availableSizes": [
      "Regular",
      "Plus Size (38-46)"
    ],
    "colors": [
      {
        "name": "Pastel Tiger Pink",
        "nameBn": "প্যাস্টেল টাইগার পিঙ্ক",
        "hex": "#F472B6"
      }
    ],
    "inStock": true,
    "stockCount": 14,
    "rating": 4.8,
    "reviewCount": 42,
    "image": "/assets/products/102.jpg",
    "galleryImages": [
      "/assets/products/102.jpg",
      "/assets/products/106.jpg"
    ],
    "description": "Trendy pastel pink and chocolate animal tiger stripe print lounge pant with white scalloped lace at hem. Waist: 34\" to 42\", Hip: 43\" to 50\", Long: 38\".",
    "descriptionBn": "ট্রেন্ডি প্যাস্টেল পিঙ্ক ও চকোলেট জেব্রা/টাইগার অ্যানিমাল স্ট্রাইপ ট্রাউজার প্যান্ট। নিচে স্কেলাপড লেইস ট্রিম। কোমর: ৩৪\" থেকে ৪২\", হিপ: ৪৩\" থেকে ৫০\", ঝুল: ৩৮\"।",
    "badge": "Plus Comfort",
    "badgeBn": "প্লাস কমফোর্ট"
  },
  {
    "id": "pj-pant-hello-kitty-ribbon",
    "name": "Hello Kitty & Ribbon Pastel Pink Pajama Pant",
    "nameBn": "হ্যালো কিটি ও রিবন সফট পিঙ্ক পায়জামা প্যান্ট",
    "category": "pajamas",
    "categoryLabelBn": "পায়জামা ও ট্রাউজার",
    "price": 290,
    "originalPrice": 480,
    "fabric": "100% Premium Soft Jersey Cotton",
    "gsm": 180,
    "chestSize": "Waist: 26\"-36\", Hip: 38\"-50\"",
    "lengthSize": "Long: 37\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Hello Kitty Pastel",
        "nameBn": "হ্যালো কিটি প্যাস্টেল",
        "hex": "#FBCFE8"
      }
    ],
    "inStock": true,
    "stockCount": 22,
    "rating": 5,
    "reviewCount": 84,
    "image": "/assets/products/100.jpg",
    "galleryImages": [
      "/assets/products/100.jpg"
    ],
    "description": "Cute Hello Kitty character with bow ribbons and mini hearts on pastel baby pink cotton. Adjustable drawstring waist. Waist: 26\" to 36\", Hip: 38\" to 50\", Long: 37\".",
    "descriptionBn": "কিউট হ্যালো কিটি ও রিবন বো প্রিন্টেড সফট বেবি পিঙ্ক কটন পায়জামা প্যান্ট। আরামদায়ক ড্র-স্ট্রিং ও ইলাস্টিক কোমর। কোমর: ২৬\" থেকে ৩৬\", হিপ: ৩৮\" থেকে ৫০\", ঝুল: ৩৭\"।",
    "badge": "Top Favorite",
    "badgeBn": "সবচেয়ে জনপ্রিয়",
    "isBestSeller": true
  },
  {
    "id": "pj-pant-hello-kitty-candy-rose",
    "name": "Hello Kitty Candy Rose Pink Pajama Pant",
    "nameBn": "হ্যালো কিটি ক্যান্ডি রোজ সফট পায়জামা প্যান্ট",
    "category": "pajamas",
    "categoryLabelBn": "পায়জামা ও ট্রাউজার",
    "price": 290,
    "originalPrice": 480,
    "fabric": "100% Pure Combed Cotton",
    "gsm": 180,
    "chestSize": "Waist: 26\"-34\", Hip: 36\"-42\"",
    "lengthSize": "Long: 38\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Candy Rose Pink",
        "nameBn": "ক্যান্ডি রোজ পিঙ্ক",
        "hex": "#F472B6"
      }
    ],
    "inStock": true,
    "stockCount": 16,
    "rating": 4.9,
    "reviewCount": 52,
    "image": "/assets/products/101.jpg",
    "galleryImages": [
      "/assets/products/101.jpg"
    ],
    "description": "Repeating Hello Kitty faces in darker rose pink on light blush cotton. Waist: 26\" to 34\", Hip: 36\" to 42\", Long: 38\".",
    "descriptionBn": "লাইট ব্লাশ কটনের ওপর ডার্ক রোজ পিঙ্ক হ্যালো কিটি মোটিফ প্রিন্ট। নরম ও আরামদায়ক ফ্যাব্রিক। কোমর: ২৬\" থেকে ৩৪\", হিপ: ৩৬\" থেকে ৪২\", ঝুল: ৩৮\"।",
    "badge": "Cute Lounge",
    "badgeBn": "কিউট লাউঞ্জ"
  },
  {
    "id": "pj-pant-gingerbread-navy",
    "name": "Festive Gingerbread Midnight Navy Pajama Pant",
    "nameBn": "জিঞ্জারব্রেড ও স্নোফ্লেক নেভি ব্লু পায়জামা প্যান্ট",
    "category": "pajamas",
    "categoryLabelBn": "পায়জামা ও ট্রাউজার",
    "price": 280,
    "originalPrice": 480,
    "fabric": "100% Export Jersey Cotton",
    "gsm": 180,
    "chestSize": "Waist: 34\"-44\", Hip: 46\"-56\"",
    "lengthSize": "Long: 38\"",
    "availableSizes": [
      "Plus Size (38-46)",
      "Regular"
    ],
    "colors": [
      {
        "name": "Midnight Navy Holiday",
        "nameBn": "মিডনাইট নেভি হলিডে",
        "hex": "#1E3A8A"
      }
    ],
    "inStock": true,
    "stockCount": 15,
    "rating": 4.8,
    "reviewCount": 39,
    "image": "/assets/products/097.jpg",
    "galleryImages": [
      "/assets/products/097.jpg"
    ],
    "description": "Festive gingerbread men, candy canes, and cozy winter houses on deep midnight navy cotton. Waist: 34\" to 44\", Hip: 46\" to 56\", Long: 38\".",
    "descriptionBn": "মিডনাইট নেভি ব্লু সুতি কাপড়ে কিউট জিঞ্জারব্রেড ম্যান ও ক্যান্ডি ক্যান প্রিন্ট। প্লাস সাইজের জন্য অত্যন্ত কমফোর্টেবল। কোমর: ৩৪\" থেকে ৪৪\", হিপ: ৪৬\" থেকে ৫৬\", ঝুল: ৩৮\"।",
    "badge": "Plus Size Comfort",
    "badgeBn": "প্লাস সাইজ কমফোর্ট"
  },
  {
    "id": "pj-pant-candy-cane-pink",
    "name": "Candy Cane Sweet Stripe Pajama Pant",
    "nameBn": "ক্যান্ডি ক্যান সুইট পিঙ্ক পায়জামা প্যান্ট",
    "category": "pajamas",
    "categoryLabelBn": "পায়জামা ও ট্রাউজার",
    "price": 280,
    "originalPrice": 480,
    "fabric": "100% Soft Cotton",
    "gsm": 175,
    "chestSize": "Waist: 26\"-34\", Hip: 36\"-46\"",
    "lengthSize": "Long: 37\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Candy Cane Pink",
        "nameBn": "ক্যান্ডি ক্যান পিঙ্ক",
        "hex": "#FDA4AF"
      }
    ],
    "inStock": true,
    "stockCount": 12,
    "rating": 4.8,
    "reviewCount": 34,
    "image": "/assets/products/098.jpg",
    "galleryImages": [
      "/assets/products/098.jpg"
    ],
    "description": "Sweet candy cane pattern on pastel pink cotton. Waist: 26\" to 34\", Hip: 36\" to 46\", Long: 37\".",
    "descriptionBn": "সফট পিঙ্ক কটনের ওপর মিষ্টি ক্যান্ডি ক্যান প্রিন্ট। কোমর: ২৬\" থেকে ৩৪\", হিপ: ৩৬\" থেকে ৪৬\", ঝুল: ৩৭\"।",
    "badge": "Sweet Pink",
    "badgeBn": "সুইট পিঙ্ক"
  },
  {
    "id": "pj-pant-polka-dot-lavender",
    "name": "Celestial Polka Dot Lavender Trouser Pant",
    "nameBn": "ল্যাভেন্ডার সেলেস্টিয়াল পোলকা ডট ট্রাউজার প্যান্ট",
    "category": "pajamas",
    "categoryLabelBn": "পায়জামা ও ট্রাউজার",
    "price": 290,
    "originalPrice": 480,
    "fabric": "100% Soft Breathable Cotton",
    "gsm": 185,
    "chestSize": "Waist: 36\"-48\", Hip: 48\"-60\"",
    "lengthSize": "Long: 38\"",
    "availableSizes": [
      "Plus Size (38-46)",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Lavender Polka",
        "nameBn": "ল্যাভেন্ডার পোলকা",
        "hex": "#C084FC"
      }
    ],
    "inStock": true,
    "stockCount": 19,
    "rating": 4.9,
    "reviewCount": 46,
    "image": "/assets/products/099.jpg",
    "galleryImages": [
      "/assets/products/099.jpg"
    ],
    "description": "Calming lavender with crisp white polka dots. Generous plus-size fit. Waist: 36\" to 48\", Hip: 48\" to 60\", Long: 38\".",
    "descriptionBn": "মনোরম ল্যাভেন্ডার কালারে ক্রিস্প হোয়াইট পোলকা ডট ট্রাউজার। প্লাস সাইজের আপুদের জন্য দারুণ আরামদায়ক। কোমর: ৩৬\" থেকে ৪৮\", হিপ: ৪৮\" থেকে ৬০\", ঝুল: ৩৮\"।",
    "badge": "Mega Plus Fit",
    "badgeBn": "মেগা প্লাস ফিট"
  },
  {
    "id": "pj-pant-heart-motif-navy",
    "name": "Classic White Heart Print Navy Pajama Pant",
    "nameBn": "ক্লাসিক নেভি হোয়াইট হার্ট প্রিন্ট পায়জামা প্যান্ট",
    "category": "pajamas",
    "categoryLabelBn": "পায়জামা ও ট্রাউজার",
    "price": 280,
    "originalPrice": 480,
    "fabric": "100% Pure Export Cotton",
    "gsm": 180,
    "chestSize": "Waist: 38\"-46\", Hip: 44\"-48\"",
    "lengthSize": "Long: 38\"",
    "availableSizes": [
      "Plus Size (38-46)",
      "Regular"
    ],
    "colors": [
      {
        "name": "Navy White Heart",
        "nameBn": "নেভি হোয়াইট হার্ট",
        "hex": "#1E3A8A"
      }
    ],
    "inStock": true,
    "stockCount": 14,
    "rating": 4.8,
    "reviewCount": 37,
    "image": "/assets/products/103.jpg",
    "galleryImages": [
      "/assets/products/103.jpg"
    ],
    "description": "Deep navy blue background with scattered white hearts. Waist: 38\" to 46\", Hip: 44\" to 48\", Long: 38\".",
    "descriptionBn": "ডিপ নেভি ব্লু সুতি কাপড়ে ছোট ছোট হোয়াইট হার্ট প্রিন্ট। কোমর: ৩৮\" থেকে ৪৬\", হিপ: ৪৪\" থেকে ৪৮\", ঝুল: ৩৮\"।",
    "badge": "Classic Heart",
    "badgeBn": "ক্লাসিক হার্ট"
  },
  {
    "id": "pj-pant-vertical-stripe-cozy",
    "name": "Clean Vertical Stripe Cozy Pajama Pant",
    "nameBn": "ক্লিন ভার্টিক্যাল স্ট্রাইপ সফট পায়জামা প্যান্ট",
    "category": "pajamas",
    "categoryLabelBn": "পায়জামা ও ট্রাউজার",
    "price": 280,
    "originalPrice": 480,
    "fabric": "100% Combed Cotton",
    "gsm": 180,
    "chestSize": "Waist: 32\"-42\", Hip: 46\"-52\"",
    "lengthSize": "Long: 38\"",
    "availableSizes": [
      "Regular",
      "Plus Size (38-46)"
    ],
    "colors": [
      {
        "name": "Vertical Stripe",
        "nameBn": "ভার্টিক্যাল স্ট্রাইপ",
        "hex": "#475569"
      }
    ],
    "inStock": true,
    "stockCount": 17,
    "rating": 4.8,
    "reviewCount": 31,
    "image": "/assets/products/104.jpg",
    "galleryImages": [
      "/assets/products/104.jpg"
    ],
    "description": "Vertical slimming stripes on breathable cotton with elastic waist. Waist: 32\" to 42\", Hip: 46\" to 52\", Long: 38\".",
    "descriptionBn": "স্লিম লুকিং ভার্টিক্যাল স্ট্রাইপ সফট কটন ট্রাউজার প্যান্ট। কোমর: ৩২\" থেকে ৪২\", হিপ: ৪৬\" থেকে ৫২\", ঝুল: ৩৮\"।",
    "badge": "Slimming Stripe",
    "badgeBn": "স্লিমিং স্ট্রাইপ"
  },
  {
    "id": "shorts-124",
    "name": "Palm Tree Summer Cotton Shorts",
    "nameBn": "পাম ট্রি সামার কটন লাউঞ্জ শর্টস",
    "category": "shorts",
    "categoryLabelBn": "কটন শর্টস (১৩০৳)",
    "price": 130,
    "originalPrice": 220,
    "fabric": "100% Pure Export Cotton (Breathable)",
    "gsm": 180,
    "chestSize": "Waist: 30-36\", Hip: 42-46\"",
    "lengthSize": "Long: 12\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Original Print",
        "nameBn": "অরিজিনাল প্রিন্ট",
        "hex": "#E11D48"
      }
    ],
    "inStock": true,
    "stockCount": 15,
    "rating": 4.9,
    "reviewCount": 54,
    "image": "/assets/products/124.jpg",
    "galleryImages": [
      "/assets/products/124.jpg"
    ],
    "description": "White base with scattered black palm tree print. 100% pure export combed cotton for summer lounging. Waist: 30-36\", Hip: 42-46\", Long: 12\".",
    "descriptionBn": "১০০% পিওর কটন এক্সপোর্ট লাউঞ্জ শর্টস। গরমে ঘরে পরার জন্য সম্পূর্ণ আরামদায়ক। মেজারমেন্ট — কোমর: 30-36\", হিপ: 42-46\", ঝুল: 12\"।",
    "badge": "Offer ৳130",
    "badgeBn": "ধামাকা অফার ১৩০৳",
    "isBestSeller": true
  },
  {
    "id": "shorts-125",
    "name": "Red Rose Floral Cotton Shorts",
    "nameBn": "রেড রোজ ফ্লোরাল সামার শর্টস",
    "category": "shorts",
    "categoryLabelBn": "কটন শর্টস (১৩০৳)",
    "price": 130,
    "originalPrice": 220,
    "fabric": "100% Pure Export Cotton (Breathable)",
    "gsm": 180,
    "chestSize": "Waist: 32-39\", Hip: 46-50\"",
    "lengthSize": "Long: 28 (Capri)\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Original Print",
        "nameBn": "অরিজিনাল প্রিন্ট",
        "hex": "#E11D48"
      }
    ],
    "inStock": true,
    "stockCount": 15,
    "rating": 4.9,
    "reviewCount": 30,
    "image": "/assets/products/125.jpg",
    "galleryImages": [
      "/assets/products/125.jpg"
    ],
    "description": "Pink base with elegant red and pink roses. 100% pure export combed cotton for summer lounging. Waist: 32-39\", Hip: 46-50\", Long: 28 (Capri)\".",
    "descriptionBn": "১০০% পিওর কটন এক্সপোর্ট লাউঞ্জ শর্টস। গরমে ঘরে পরার জন্য সম্পূর্ণ আরামদায়ক। মেজারমেন্ট — কোমর: 32-39\", হিপ: 46-50\", ঝুল: 28 (Capri)\"।",
    "badge": "Offer ৳130",
    "badgeBn": "ধামাকা অফার ১৩০৳",
    "isBestSeller": false
  },
  {
    "id": "shorts-128",
    "name": "Nooze Cozy Lounge Shorts",
    "nameBn": "নূজ কোজি পোলকা ডট শর্টস",
    "category": "shorts",
    "categoryLabelBn": "কটন শর্টস (১৩০৳)",
    "price": 130,
    "originalPrice": 220,
    "fabric": "100% Pure Export Cotton (Breathable)",
    "gsm": 180,
    "chestSize": "Waist: 32-42\", Hip: 48-56\"",
    "lengthSize": "Long: 12\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Original Print",
        "nameBn": "অরিজিনাল প্রিন্ট",
        "hex": "#E11D48"
      }
    ],
    "inStock": true,
    "stockCount": 15,
    "rating": 4.9,
    "reviewCount": 33,
    "image": "/assets/products/128.jpg",
    "galleryImages": [
      "/assets/products/128.jpg"
    ],
    "description": "Blue with white polka dots and delicate lace trim. 100% pure export combed cotton for summer lounging. Waist: 32-42\", Hip: 48-56\", Long: 12\".",
    "descriptionBn": "১০০% পিওর কটন এক্সপোর্ট লাউঞ্জ শর্টস। গরমে ঘরে পরার জন্য সম্পূর্ণ আরামদায়ক। মেজারমেন্ট — কোমর: 32-42\", হিপ: 48-56\", ঝুল: 12\"।",
    "badge": "Offer ৳130",
    "badgeBn": "ধামাকা অফার ১৩০৳",
    "isBestSeller": false
  },
  {
    "id": "shorts-129",
    "name": "Sweet Blue Floral Sleep Shorts",
    "nameBn": "সুইট ব্লু ফ্লোরাল স্লিপ শর্টস",
    "category": "shorts",
    "categoryLabelBn": "কটন শর্টস (১৩০৳)",
    "price": 130,
    "originalPrice": 220,
    "fabric": "100% Pure Export Cotton (Breathable)",
    "gsm": 180,
    "chestSize": "Waist: 32-40\", Hip: 48-56\"",
    "lengthSize": "Long: 13\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Original Print",
        "nameBn": "অরিজিনাল প্রিন্ট",
        "hex": "#E11D48"
      }
    ],
    "inStock": true,
    "stockCount": 15,
    "rating": 4.9,
    "reviewCount": 34,
    "image": "/assets/products/129.jpg",
    "galleryImages": [
      "/assets/products/129.jpg"
    ],
    "description": "White base with dainty blue flowers. 100% pure export combed cotton for summer lounging. Waist: 32-40\", Hip: 48-56\", Long: 13\".",
    "descriptionBn": "১০০% পিওর কটন এক্সপোর্ট লাউঞ্জ শর্টস। গরমে ঘরে পরার জন্য সম্পূর্ণ আরামদায়ক। মেজারমেন্ট — কোমর: 32-40\", হিপ: 48-56\", ঝুল: 13\"।",
    "badge": "Offer ৳130",
    "badgeBn": "ধামাকা অফার ১৩০৳",
    "isBestSeller": false
  },
  {
    "id": "shorts-130",
    "name": "Marine Ocean & Crab Print Shorts",
    "nameBn": "সামার মেরিন ক্র্যাব কটন শর্টস",
    "category": "shorts",
    "categoryLabelBn": "কটন শর্টস (১৩০৳)",
    "price": 130,
    "originalPrice": 220,
    "fabric": "100% Pure Export Cotton (Breathable)",
    "gsm": 180,
    "chestSize": "Waist: 30-38\", Hip: 44-54\"",
    "lengthSize": "Long: 13\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Original Print",
        "nameBn": "অরিজিনাল প্রিন্ট",
        "hex": "#E11D48"
      }
    ],
    "inStock": true,
    "stockCount": 15,
    "rating": 4.9,
    "reviewCount": 35,
    "image": "/assets/products/130.jpg",
    "galleryImages": [
      "/assets/products/130.jpg"
    ],
    "description": "Nautical marine crabs, lobsters and starfish print. 100% pure export combed cotton for summer lounging. Waist: 30-38\", Hip: 44-54\", Long: 13\".",
    "descriptionBn": "১০০% পিওর কটন এক্সপোর্ট লাউঞ্জ শর্টস। গরমে ঘরে পরার জন্য সম্পূর্ণ আরামদায়ক। মেজারমেন্ট — কোমর: 30-38\", হিপ: 44-54\", ঝুল: 13\"।",
    "badge": "Offer ৳130",
    "badgeBn": "ধামাকা অফার ১৩০৳",
    "isBestSeller": true
  },
  {
    "id": "shorts-131",
    "name": "Yellow Blossom Floral Shorts",
    "nameBn": "ইয়েলো ব্লসম সামার শর্টস",
    "category": "shorts",
    "categoryLabelBn": "কটন শর্টস (১৩০৳)",
    "price": 130,
    "originalPrice": 220,
    "fabric": "100% Pure Export Cotton (Breathable)",
    "gsm": 180,
    "chestSize": "Waist: 36-40\", Hip: 44-48\"",
    "lengthSize": "Long: 12\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Original Print",
        "nameBn": "অরিজিনাল প্রিন্ট",
        "hex": "#E11D48"
      }
    ],
    "inStock": true,
    "stockCount": 15,
    "rating": 4.9,
    "reviewCount": 36,
    "image": "/assets/products/131.jpg",
    "galleryImages": [
      "/assets/products/131.jpg"
    ],
    "description": "Blue flowers with sunny yellow accents. 100% pure export combed cotton for summer lounging. Waist: 36-40\", Hip: 44-48\", Long: 12\".",
    "descriptionBn": "১০০% পিওর কটন এক্সপোর্ট লাউঞ্জ শর্টস। গরমে ঘরে পরার জন্য সম্পূর্ণ আরামদায়ক। মেজারমেন্ট — কোমর: 36-40\", হিপ: 44-48\", ঝুল: 12\"।",
    "badge": "Offer ৳130",
    "badgeBn": "ধামাকা অফার ১৩০৳",
    "isBestSeller": false
  },
  {
    "id": "shorts-132",
    "name": "Comfort Fit Breathable Shorts",
    "nameBn": "পিঙ্ক অ্যান্ড হোয়াইট প্লাইড শর্টস",
    "category": "shorts",
    "categoryLabelBn": "কটন শর্টস (১৩০৳)",
    "price": 130,
    "originalPrice": 220,
    "fabric": "100% Pure Export Cotton (Breathable)",
    "gsm": 180,
    "chestSize": "Waist: 32-40\", Hip: 48-54\"",
    "lengthSize": "Long: 14\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Original Print",
        "nameBn": "অরিজিনাল প্রিন্ট",
        "hex": "#E11D48"
      }
    ],
    "inStock": true,
    "stockCount": 15,
    "rating": 4.9,
    "reviewCount": 37,
    "image": "/assets/products/132.jpg",
    "galleryImages": [
      "/assets/products/132.jpg"
    ],
    "description": "Classic pink and white checkered plaid. 100% pure export combed cotton for summer lounging. Waist: 32-40\", Hip: 48-54\", Long: 14\".",
    "descriptionBn": "১০০% পিওর কটন এক্সপোর্ট লাউঞ্জ শর্টস। গরমে ঘরে পরার জন্য সম্পূর্ণ আরামদায়ক। মেজারমেন্ট — কোমর: 32-40\", হিপ: 48-54\", ঝুল: 14\"।",
    "badge": "Offer ৳130",
    "badgeBn": "ধামাকা অফার ১৩০৳",
    "isBestSeller": false
  },
  {
    "id": "shorts-133",
    "name": "Red Heart Ruffle Hem Shorts",
    "nameBn": "রেড হার্ট রাফেল হেম কটন শর্টস",
    "category": "shorts",
    "categoryLabelBn": "কটন শর্টস (১৩০৳)",
    "price": 130,
    "originalPrice": 220,
    "fabric": "100% Pure Export Cotton (Breathable)",
    "gsm": 180,
    "chestSize": "Waist: 28-36\", Hip: 44-52\"",
    "lengthSize": "Long: 14\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Original Print",
        "nameBn": "অরিজিনাল প্রিন্ট",
        "hex": "#E11D48"
      }
    ],
    "inStock": true,
    "stockCount": 15,
    "rating": 4.9,
    "reviewCount": 38,
    "image": "/assets/products/133.jpg",
    "galleryImages": [
      "/assets/products/133.jpg"
    ],
    "description": "Red base with sweet pink hearts and ruffle hem. 100% pure export combed cotton for summer lounging. Waist: 28-36\", Hip: 44-52\", Long: 14\".",
    "descriptionBn": "১০০% পিওর কটন এক্সপোর্ট লাউঞ্জ শর্টস। গরমে ঘরে পরার জন্য সম্পূর্ণ আরামদায়ক। মেজারমেন্ট — কোমর: 28-36\", হিপ: 44-52\", ঝুল: 14\"।",
    "badge": "Offer ৳130",
    "badgeBn": "ধামাকা অফার ১৩০৳",
    "isBestSeller": true
  },
  {
    "id": "shorts-134",
    "name": "Long Cut Pure Cotton Lounge Shorts",
    "nameBn": "লং কাট স্টার প্রিন্ট কটন শর্টস",
    "category": "shorts",
    "categoryLabelBn": "কটন শর্টস (১৩০৳)",
    "price": 130,
    "originalPrice": 220,
    "fabric": "100% Pure Export Cotton (Breathable)",
    "gsm": 180,
    "chestSize": "Waist: 30-38\", Hip: 46-54\"",
    "lengthSize": "Long: 15\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Original Print",
        "nameBn": "অরিজিনাল প্রিন্ট",
        "hex": "#E11D48"
      }
    ],
    "inStock": true,
    "stockCount": 15,
    "rating": 4.9,
    "reviewCount": 39,
    "image": "/assets/products/134.jpg",
    "galleryImages": [
      "/assets/products/134.jpg"
    ],
    "description": "Beige fabric with cute mini star print. 100% pure export combed cotton for summer lounging. Waist: 30-38\", Hip: 46-54\", Long: 15\".",
    "descriptionBn": "১০০% পিওর কটন এক্সপোর্ট লাউঞ্জ শর্টস। গরমে ঘরে পরার জন্য সম্পূর্ণ আরামদায়ক। মেজারমেন্ট — কোমর: 30-38\", হিপ: 46-54\", ঝুল: 15\"।",
    "badge": "Offer ৳130",
    "badgeBn": "ধামাকা অফার ১৩০৳",
    "isBestSeller": false
  },
  {
    "id": "shorts-135",
    "name": "Soft Lace Hem Sleep Shorts",
    "nameBn": "সফট লেইস হেম কমফোর্ট শর্টস",
    "category": "shorts",
    "categoryLabelBn": "কটন শর্টস (১৩০৳)",
    "price": 130,
    "originalPrice": 220,
    "fabric": "100% Pure Export Cotton (Breathable)",
    "gsm": 180,
    "chestSize": "Waist: 28-34\", Hip: 44-54\"",
    "lengthSize": "Long: 14\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Original Print",
        "nameBn": "অরিজিনাল প্রিন্ট",
        "hex": "#E11D48"
      }
    ],
    "inStock": true,
    "stockCount": 15,
    "rating": 4.9,
    "reviewCount": 40,
    "image": "/assets/products/135.jpg",
    "galleryImages": [
      "/assets/products/135.jpg"
    ],
    "description": "Soft pastel with delicate scalloped lace. 100% pure export combed cotton for summer lounging. Waist: 28-34\", Hip: 44-54\", Long: 14\".",
    "descriptionBn": "১০০% পিওর কটন এক্সপোর্ট লাউঞ্জ শর্টস। গরমে ঘরে পরার জন্য সম্পূর্ণ আরামদায়ক। মেজারমেন্ট — কোমর: 28-34\", হিপ: 44-54\", ঝুল: 14\"।",
    "badge": "Offer ৳130",
    "badgeBn": "ধামাকা অফার ১৩০৳",
    "isBestSeller": false
  },
  {
    "id": "shorts-136",
    "name": "Pink Heart Lace Trim Shorts",
    "nameBn": "পিঙ্ক হার্ট লেইস ট্রিম শর্টস",
    "category": "shorts",
    "categoryLabelBn": "কটন শর্টস (১৩০৳)",
    "price": 130,
    "originalPrice": 220,
    "fabric": "100% Pure Export Cotton (Breathable)",
    "gsm": 180,
    "chestSize": "Waist: 32-38\", Hip: 54-62\"",
    "lengthSize": "Long: 13\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Original Print",
        "nameBn": "অরিজিনাল প্রিন্ট",
        "hex": "#E11D48"
      }
    ],
    "inStock": true,
    "stockCount": 15,
    "rating": 4.9,
    "reviewCount": 41,
    "image": "/assets/products/136.jpg",
    "galleryImages": [
      "/assets/products/136.jpg"
    ],
    "description": "Light pink fabric with subtle hearts and lace trim. 100% pure export combed cotton for summer lounging. Waist: 32-38\", Hip: 54-62\", Long: 13\".",
    "descriptionBn": "১০০% পিওর কটন এক্সপোর্ট লাউঞ্জ শর্টস। গরমে ঘরে পরার জন্য সম্পূর্ণ আরামদায়ক। মেজারমেন্ট — কোমর: 32-38\", হিপ: 54-62\", ঝুল: 13\"।",
    "badge": "Offer ৳130",
    "badgeBn": "ধামাকা অফার ১৩০৳",
    "isBestSeller": true
  },
  {
    "id": "shorts-137",
    "name": "Extra Comfort Long Lounge Shorts",
    "nameBn": "এক্সট্রা কমফোর্ট ব্লু ফ্লোরাল লং শর্টস",
    "category": "shorts",
    "categoryLabelBn": "কটন শর্টস (১৩০৳)",
    "price": 130,
    "originalPrice": 220,
    "fabric": "100% Pure Export Cotton (Breathable)",
    "gsm": 180,
    "chestSize": "Waist: 28-36\", Hip: 46-54\"",
    "lengthSize": "Long: 16\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Original Print",
        "nameBn": "অরিজিনাল প্রিন্ট",
        "hex": "#E11D48"
      }
    ],
    "inStock": true,
    "stockCount": 15,
    "rating": 4.9,
    "reviewCount": 42,
    "image": "/assets/products/137.jpg",
    "galleryImages": [
      "/assets/products/137.jpg"
    ],
    "description": "Long 16-inch modest length with blue floral print. 100% pure export combed cotton for summer lounging. Waist: 28-36\", Hip: 46-54\", Long: 16\".",
    "descriptionBn": "১০০% পিওর কটন এক্সপোর্ট লাউঞ্জ শর্টস। গরমে ঘরে পরার জন্য সম্পূর্ণ আরামদায়ক। মেজারমেন্ট — কোমর: 28-36\", হিপ: 46-54\", ঝুল: 16\"।",
    "badge": "Offer ৳130",
    "badgeBn": "ধামাকা অফার ১৩০৳",
    "isBestSeller": false
  },
  {
    "id": "shorts-138",
    "name": "Coffee Mug Morning Sleep Shorts",
    "nameBn": "মর্নিং কফি মগ ইয়েলো শর্টস",
    "category": "shorts",
    "categoryLabelBn": "কটন শর্টস (১৩০৳)",
    "price": 130,
    "originalPrice": 220,
    "fabric": "100% Pure Export Cotton (Breathable)",
    "gsm": 180,
    "chestSize": "Waist: 30-34\", Hip: 42-52\"",
    "lengthSize": "Long: 13\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Original Print",
        "nameBn": "অরিজিনাল প্রিন্ট",
        "hex": "#E11D48"
      }
    ],
    "inStock": true,
    "stockCount": 15,
    "rating": 4.9,
    "reviewCount": 43,
    "image": "/assets/products/138.jpg",
    "galleryImages": [
      "/assets/products/138.jpg"
    ],
    "description": "Cheery yellow with cute coffee mug motifs. 100% pure export combed cotton for summer lounging. Waist: 30-34\", Hip: 42-52\", Long: 13\".",
    "descriptionBn": "১০০% পিওর কটন এক্সপোর্ট লাউঞ্জ শর্টস। গরমে ঘরে পরার জন্য সম্পূর্ণ আরামদায়ক। মেজারমেন্ট — কোমর: 30-34\", হিপ: 42-52\", ঝুল: 13\"।",
    "badge": "Offer ৳130",
    "badgeBn": "ধামাকা অফার ১৩০৳",
    "isBestSeller": false
  },
  {
    "id": "shorts-139",
    "name": "Mini Pocket Cotton Lounge Shorts",
    "nameBn": "ফ্লোরাল গার্ডেন কমফোর্ট শর্টস",
    "category": "shorts",
    "categoryLabelBn": "কটন শর্টস (১৩০৳)",
    "price": 130,
    "originalPrice": 220,
    "fabric": "100% Pure Export Cotton (Breathable)",
    "gsm": 180,
    "chestSize": "Waist: 26-30\", Hip: 38-46\"",
    "lengthSize": "Long: 12\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Original Print",
        "nameBn": "অরিজিনাল প্রিন্ট",
        "hex": "#E11D48"
      }
    ],
    "inStock": true,
    "stockCount": 15,
    "rating": 4.9,
    "reviewCount": 44,
    "image": "/assets/products/139.jpg",
    "galleryImages": [
      "/assets/products/139.jpg"
    ],
    "description": "Compact fit with colorful floral blossoms. 100% pure export combed cotton for summer lounging. Waist: 26-30\", Hip: 38-46\", Long: 12\".",
    "descriptionBn": "১০০% পিওর কটন এক্সপোর্ট লাউঞ্জ শর্টস। গরমে ঘরে পরার জন্য সম্পূর্ণ আরামদায়ক। মেজারমেন্ট — কোমর: 26-30\", হিপ: 38-46\", ঝুল: 12\"।",
    "badge": "Offer ৳130",
    "badgeBn": "ধামাকা অফার ১৩০৳",
    "isBestSeller": false
  },
  {
    "id": "shorts-140",
    "name": "White Botanical Cotton Shorts",
    "nameBn": "বোটানিক্যাল স্টার প্রিন্ট কটন শর্টস",
    "category": "shorts",
    "categoryLabelBn": "কটন শর্টস (১৩০৳)",
    "price": 130,
    "originalPrice": 220,
    "fabric": "100% Pure Export Cotton (Breathable)",
    "gsm": 180,
    "chestSize": "Waist: 30-36\", Hip: 40-58\"",
    "lengthSize": "Long: 12\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Original Print",
        "nameBn": "অরিজিনাল প্রিন্ট",
        "hex": "#E11D48"
      }
    ],
    "inStock": true,
    "stockCount": 15,
    "rating": 4.9,
    "reviewCount": 45,
    "image": "/assets/products/140.jpg",
    "galleryImages": [
      "/assets/products/140.jpg"
    ],
    "description": "Crisp white with botanical star motifs. 100% pure export combed cotton for summer lounging. Waist: 30-36\", Hip: 40-58\", Long: 12\".",
    "descriptionBn": "১০০% পিওর কটন এক্সপোর্ট লাউঞ্জ শর্টস। গরমে ঘরে পরার জন্য সম্পূর্ণ আরামদায়ক। মেজারমেন্ট — কোমর: 30-36\", হিপ: 40-58\", ঝুল: 12\"।",
    "badge": "Offer ৳130",
    "badgeBn": "ধামাকা অফার ১৩০৳",
    "isBestSeller": false
  },
  {
    "id": "shorts-141",
    "name": "Summer Drawstring Cotton Shorts",
    "nameBn": "সানসেট টাই-ডাই কমফোর্ট শর্টস",
    "category": "shorts",
    "categoryLabelBn": "কটন শর্টস (১৩০৳)",
    "price": 130,
    "originalPrice": 220,
    "fabric": "100% Pure Export Cotton (Breathable)",
    "gsm": 180,
    "chestSize": "Waist: 30-38\", Hip: 41-48\"",
    "lengthSize": "Long: 12\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Original Print",
        "nameBn": "অরিজিনাল প্রিন্ট",
        "hex": "#E11D48"
      }
    ],
    "inStock": true,
    "stockCount": 15,
    "rating": 4.9,
    "reviewCount": 46,
    "image": "/assets/products/141.jpg",
    "galleryImages": [
      "/assets/products/141.jpg"
    ],
    "description": "Vibrant pink and peach tie-dye wash. 100% pure export combed cotton for summer lounging. Waist: 30-38\", Hip: 41-48\", Long: 12\".",
    "descriptionBn": "১০০% পিওর কটন এক্সপোর্ট লাউঞ্জ শর্টস। গরমে ঘরে পরার জন্য সম্পূর্ণ আরামদায়ক। মেজারমেন্ট — কোমর: 30-38\", হিপ: 41-48\", ঝুল: 12\"।",
    "badge": "Offer ৳130",
    "badgeBn": "ধামাকা অফার ১৩০৳",
    "isBestSeller": false
  },
  {
    "id": "shorts-142",
    "name": "Relaxed Sleep Cotton Shorts",
    "nameBn": "ব্লু লেইস ট্রিম স্লিপ শর্টস",
    "category": "shorts",
    "categoryLabelBn": "কটন শর্টস (১৩০৳)",
    "price": 130,
    "originalPrice": 220,
    "fabric": "100% Pure Export Cotton (Breathable)",
    "gsm": 180,
    "chestSize": "Waist: 30-38\", Hip: 46-50\"",
    "lengthSize": "Long: 11\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Original Print",
        "nameBn": "অরিজিনাল প্রিন্ট",
        "hex": "#E11D48"
      }
    ],
    "inStock": true,
    "stockCount": 15,
    "rating": 4.9,
    "reviewCount": 47,
    "image": "/assets/products/142.jpg",
    "galleryImages": [
      "/assets/products/142.jpg"
    ],
    "description": "Blue floral print with lace trim edge. 100% pure export combed cotton for summer lounging. Waist: 30-38\", Hip: 46-50\", Long: 11\".",
    "descriptionBn": "১০০% পিওর কটন এক্সপোর্ট লাউঞ্জ শর্টস। গরমে ঘরে পরার জন্য সম্পূর্ণ আরামদায়ক। মেজারমেন্ট — কোমর: 30-38\", হিপ: 46-50\", ঝুল: 11\"।",
    "badge": "Offer ৳130",
    "badgeBn": "ধামাকা অফার ১৩০৳",
    "isBestSeller": false
  },
  {
    "id": "shorts-143",
    "name": "Grey Stripe Cotton Lounge Shorts",
    "nameBn": "গ্রে স্ট্রাইপ সফট কটন শর্টস",
    "category": "shorts",
    "categoryLabelBn": "কটন শর্টস (১৩০৳)",
    "price": 130,
    "originalPrice": 220,
    "fabric": "100% Pure Export Cotton (Breathable)",
    "gsm": 180,
    "chestSize": "Waist: 32-38\", Hip: 46-54\"",
    "lengthSize": "Long: 11\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Original Print",
        "nameBn": "অরিজিনাল প্রিন্ট",
        "hex": "#E11D48"
      }
    ],
    "inStock": true,
    "stockCount": 15,
    "rating": 4.9,
    "reviewCount": 48,
    "image": "/assets/products/143.jpg",
    "galleryImages": [
      "/assets/products/143.jpg"
    ],
    "description": "Horizontal heather grey and white stripes. 100% pure export combed cotton for summer lounging. Waist: 32-38\", Hip: 46-54\", Long: 11\".",
    "descriptionBn": "১০০% পিওর কটন এক্সপোর্ট লাউঞ্জ শর্টস। গরমে ঘরে পরার জন্য সম্পূর্ণ আরামদায়ক। মেজারমেন্ট — কোমর: 32-38\", হিপ: 46-54\", ঝুল: 11\"।",
    "badge": "Offer ৳130",
    "badgeBn": "ধামাকা অফার ১৩০৳",
    "isBestSeller": false
  },
  {
    "id": "shorts-144",
    "name": "Wild Leopard Breathing Cotton Shorts",
    "nameBn": "ওয়াইল্ড লেপার্ড প্রিন্ট কটন শর্টস",
    "category": "shorts",
    "categoryLabelBn": "কটন শর্টস (১৩০৳)",
    "price": 130,
    "originalPrice": 220,
    "fabric": "100% Pure Export Cotton (Breathable)",
    "gsm": 180,
    "chestSize": "Waist: 30-36\", Hip: 46-60\"",
    "lengthSize": "Long: 11\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Original Print",
        "nameBn": "অরিজিনাল প্রিন্ট",
        "hex": "#E11D48"
      }
    ],
    "inStock": true,
    "stockCount": 15,
    "rating": 4.9,
    "reviewCount": 49,
    "image": "/assets/products/144.jpg",
    "galleryImages": [
      "/assets/products/144.jpg"
    ],
    "description": "Trendy leopard print with wide hip comfort. 100% pure export combed cotton for summer lounging. Waist: 30-36\", Hip: 46-60\", Long: 11\".",
    "descriptionBn": "১০০% পিওর কটন এক্সপোর্ট লাউঞ্জ শর্টস। গরমে ঘরে পরার জন্য সম্পূর্ণ আরামদায়ক। মেজারমেন্ট — কোমর: 30-36\", হিপ: 46-60\", ঝুল: 11\"।",
    "badge": "Offer ৳130",
    "badgeBn": "ধামাকা অফার ১৩০৳",
    "isBestSeller": false
  },
  {
    "id": "shorts-145",
    "name": "Nautical Blue Stripe Cotton Shorts",
    "nameBn": "নটিক্যাল ব্লু স্ট্রাইপ কটন শর্টস",
    "category": "shorts",
    "categoryLabelBn": "কটন শর্টস (১৩০৳)",
    "price": 130,
    "originalPrice": 220,
    "fabric": "100% Pure Export Cotton (Breathable)",
    "gsm": 180,
    "chestSize": "Waist: 32-38\", Hip: 46-50\"",
    "lengthSize": "Long: 11\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Original Print",
        "nameBn": "অরিজিনাল প্রিন্ট",
        "hex": "#E11D48"
      }
    ],
    "inStock": true,
    "stockCount": 15,
    "rating": 4.9,
    "reviewCount": 50,
    "image": "/assets/products/145.jpg",
    "galleryImages": [
      "/assets/products/145.jpg"
    ],
    "description": "Crisp blue and white horizontal stripes. 100% pure export combed cotton for summer lounging. Waist: 32-38\", Hip: 46-50\", Long: 11\".",
    "descriptionBn": "১০০% পিওর কটন এক্সপোর্ট লাউঞ্জ শর্টস। গরমে ঘরে পরার জন্য সম্পূর্ণ আরামদায়ক। মেজারমেন্ট — কোমর: 32-38\", হিপ: 46-50\", ঝুল: 11\"।",
    "badge": "Offer ৳130",
    "badgeBn": "ধামাকা অফার ১৩০৳",
    "isBestSeller": false
  },
  {
    "id": "shorts-146",
    "name": "Berry Botanical Cotton Shorts",
    "nameBn": "বেরি ফ্লোরাল বোটানিক্যাল শর্টস",
    "category": "shorts",
    "categoryLabelBn": "কটন শর্টস (১৩০৳)",
    "price": 130,
    "originalPrice": 220,
    "fabric": "100% Pure Export Cotton (Breathable)",
    "gsm": 180,
    "chestSize": "Waist: 28-36\", Hip: 44-50\"",
    "lengthSize": "Long: 11\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Original Print",
        "nameBn": "অরিজিনাল প্রিন্ট",
        "hex": "#E11D48"
      }
    ],
    "inStock": true,
    "stockCount": 15,
    "rating": 4.9,
    "reviewCount": 51,
    "image": "/assets/products/146.jpg",
    "galleryImages": [
      "/assets/products/146.jpg"
    ],
    "description": "White base with leaves and sweet berries. 100% pure export combed cotton for summer lounging. Waist: 28-36\", Hip: 44-50\", Long: 11\".",
    "descriptionBn": "১০০% পিওর কটন এক্সপোর্ট লাউঞ্জ শর্টস। গরমে ঘরে পরার জন্য সম্পূর্ণ আরামদায়ক। মেজারমেন্ট — কোমর: 28-36\", হিপ: 44-50\", ঝুল: 11\"।",
    "badge": "Offer ৳130",
    "badgeBn": "ধামাকা অফার ১৩০৳",
    "isBestSeller": false
  },
  {
    "id": "shorts-147",
    "name": "Cute Panda Summer Sleep Shorts",
    "nameBn": "কিউট পান্ডা প্রিন্ট সামার শর্টস",
    "category": "shorts",
    "categoryLabelBn": "কটন শর্টস (১৩০৳)",
    "price": 130,
    "originalPrice": 220,
    "fabric": "100% Pure Export Cotton (Breathable)",
    "gsm": 180,
    "chestSize": "Waist: 28-34\", Hip: 40-48\"",
    "lengthSize": "Long: 12\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Original Print",
        "nameBn": "অরিজিনাল প্রিন্ট",
        "hex": "#E11D48"
      }
    ],
    "inStock": true,
    "stockCount": 15,
    "rating": 4.9,
    "reviewCount": 52,
    "image": "/assets/products/147.jpg",
    "galleryImages": [
      "/assets/products/147.jpg"
    ],
    "description": "Playful black & white pandas on soft cotton. 100% pure export combed cotton for summer lounging. Waist: 28-34\", Hip: 40-48\", Long: 12\".",
    "descriptionBn": "১০০% পিওর কটন এক্সপোর্ট লাউঞ্জ শর্টস। গরমে ঘরে পরার জন্য সম্পূর্ণ আরামদায়ক। মেজারমেন্ট — কোমর: 28-34\", হিপ: 40-48\", ঝুল: 12\"।",
    "badge": "Offer ৳130",
    "badgeBn": "ধামাকা অফার ১৩০৳",
    "isBestSeller": false
  },
  {
    "id": "shorts-148",
    "name": "Polka Dot Charcoal Shorts",
    "nameBn": "পোলকা ডট চারকোল সফট শর্টস",
    "category": "shorts",
    "categoryLabelBn": "কটন শর্টস (১৩০৳)",
    "price": 130,
    "originalPrice": 220,
    "fabric": "100% Pure Export Cotton (Breathable)",
    "gsm": 180,
    "chestSize": "Waist: 28-34\", Hip: 36-40\"",
    "lengthSize": "Long: 11\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Original Print",
        "nameBn": "অরিজিনাল প্রিন্ট",
        "hex": "#E11D48"
      }
    ],
    "inStock": true,
    "stockCount": 15,
    "rating": 4.9,
    "reviewCount": 53,
    "image": "/assets/products/148.jpg",
    "galleryImages": [
      "/assets/products/148.jpg"
    ],
    "description": "Charcoal base with dainty white dots. 100% pure export combed cotton for summer lounging. Waist: 28-34\", Hip: 36-40\", Long: 11\".",
    "descriptionBn": "১০০% পিওর কটন এক্সপোর্ট লাউঞ্জ শর্টস। গরমে ঘরে পরার জন্য সম্পূর্ণ আরামদায়ক। মেজারমেন্ট — কোমর: 28-34\", হিপ: 36-40\", ঝুল: 11\"।",
    "badge": "Offer ৳130",
    "badgeBn": "ধামাকা অফার ১৩০৳",
    "isBestSeller": false
  },
  {
    "id": "shorts-149",
    "name": "Classic Polka Dot Cotton Shorts",
    "nameBn": "ক্লাসিক পোলকা ডট কটন শর্টস",
    "category": "shorts",
    "categoryLabelBn": "কটন শর্টস (১৩০৳)",
    "price": 130,
    "originalPrice": 220,
    "fabric": "100% Pure Export Cotton (Breathable)",
    "gsm": 180,
    "chestSize": "Waist: 28-34\", Hip: 38-42\"",
    "lengthSize": "Long: 13\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Original Print",
        "nameBn": "অরিজিনাল প্রিন্ট",
        "hex": "#E11D48"
      }
    ],
    "inStock": true,
    "stockCount": 15,
    "rating": 4.9,
    "reviewCount": 54,
    "image": "/assets/products/149.jpg",
    "galleryImages": [
      "/assets/products/149.jpg"
    ],
    "description": "Comfortable waist with neat polka dots. 100% pure export combed cotton for summer lounging. Waist: 28-34\", Hip: 38-42\", Long: 13\".",
    "descriptionBn": "১০০% পিওর কটন এক্সপোর্ট লাউঞ্জ শর্টস। গরমে ঘরে পরার জন্য সম্পূর্ণ আরামদায়ক। মেজারমেন্ট — কোমর: 28-34\", হিপ: 38-42\", ঝুল: 13\"।",
    "badge": "Offer ৳130",
    "badgeBn": "ধামাকা অফার ১৩০৳",
    "isBestSeller": false
  },
  {
    "id": "shorts-150",
    "name": "Coffee & Cookies Pure Cotton Shorts",
    "nameBn": "কফি অ্যান্ড কুকিজ ফান শর্টস",
    "category": "shorts",
    "categoryLabelBn": "কটন শর্টস (১৩০৳)",
    "price": 130,
    "originalPrice": 220,
    "fabric": "100% Pure Export Cotton (Breathable)",
    "gsm": 180,
    "chestSize": "Waist: 26-36\", Hip: 38-42\"",
    "lengthSize": "Long: 12\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Original Print",
        "nameBn": "অরিজিনাল প্রিন্ট",
        "hex": "#E11D48"
      }
    ],
    "inStock": true,
    "stockCount": 15,
    "rating": 4.9,
    "reviewCount": 30,
    "image": "/assets/products/150.jpg",
    "galleryImages": [
      "/assets/products/150.jpg"
    ],
    "description": "Cute morning coffee cups and cookie prints. 100% pure export combed cotton for summer lounging. Waist: 26-36\", Hip: 38-42\", Long: 12\".",
    "descriptionBn": "১০০% পিওর কটন এক্সপোর্ট লাউঞ্জ শর্টস। গরমে ঘরে পরার জন্য সম্পূর্ণ আরামদায়ক। মেজারমেন্ট — কোমর: 26-36\", হিপ: 38-42\", ঝুল: 12\"।",
    "badge": "Offer ৳130",
    "badgeBn": "ধামাকা অফার ১৩০৳",
    "isBestSeller": false
  },
  {
    "id": "shorts-151",
    "name": "Multi-Color Abstract Cotton Shorts",
    "nameBn": "কালারফুল অ্যাবস্ট্রাক্ট সামার শর্টস",
    "category": "shorts",
    "categoryLabelBn": "কটন শর্টস (১৩০৳)",
    "price": 130,
    "originalPrice": 220,
    "fabric": "100% Pure Export Cotton (Breathable)",
    "gsm": 180,
    "chestSize": "Waist: 28-34\", Hip: 46-50\"",
    "lengthSize": "Long: 11\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Original Print",
        "nameBn": "অরিজিনাল প্রিন্ট",
        "hex": "#E11D48"
      }
    ],
    "inStock": true,
    "stockCount": 15,
    "rating": 4.9,
    "reviewCount": 31,
    "image": "/assets/products/151.jpg",
    "galleryImages": [
      "/assets/products/151.jpg"
    ],
    "description": "Bright abstract strokes on soft cotton. 100% pure export combed cotton for summer lounging. Waist: 28-34\", Hip: 46-50\", Long: 11\".",
    "descriptionBn": "১০০% পিওর কটন এক্সপোর্ট লাউঞ্জ শর্টস। গরমে ঘরে পরার জন্য সম্পূর্ণ আরামদায়ক। মেজারমেন্ট — কোমর: 28-34\", হিপ: 46-50\", ঝুল: 11\"।",
    "badge": "Offer ৳130",
    "badgeBn": "ধামাকা অফার ১৩০৳",
    "isBestSeller": false
  },
  {
    "id": "shorts-152",
    "name": "Sweet Heart Printed Cotton Shorts",
    "nameBn": "সুইট হার্ট প্রিন্ট কটন শর্টস",
    "category": "shorts",
    "categoryLabelBn": "কটন শর্টস (১৩০৳)",
    "price": 130,
    "originalPrice": 220,
    "fabric": "100% Pure Export Cotton (Breathable)",
    "gsm": 180,
    "chestSize": "Waist: 30-34\", Hip: 40-50\"",
    "lengthSize": "Long: 11\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Original Print",
        "nameBn": "অরিজিনাল প্রিন্ট",
        "hex": "#E11D48"
      }
    ],
    "inStock": true,
    "stockCount": 15,
    "rating": 4.9,
    "reviewCount": 32,
    "image": "/assets/products/152.jpg",
    "galleryImages": [
      "/assets/products/152.jpg"
    ],
    "description": "Romantic mini heart print for lounge comfort. 100% pure export combed cotton for summer lounging. Waist: 30-34\", Hip: 40-50\", Long: 11\".",
    "descriptionBn": "১০০% পিওর কটন এক্সপোর্ট লাউঞ্জ শর্টস। গরমে ঘরে পরার জন্য সম্পূর্ণ আরামদায়ক। মেজারমেন্ট — কোমর: 30-34\", হিপ: 40-50\", ঝুল: 11\"।",
    "badge": "Offer ৳130",
    "badgeBn": "ধামাকা অফার ১৩০৳",
    "isBestSeller": false
  },
  {
    "id": "shorts-153",
    "name": "Relaxed Polka Dot Long Shorts",
    "nameBn": "রিল্যাক্সড পোলকা ডট লং শর্টস",
    "category": "shorts",
    "categoryLabelBn": "কটন শর্টস (১৩০৳)",
    "price": 130,
    "originalPrice": 220,
    "fabric": "100% Pure Export Cotton (Breathable)",
    "gsm": 180,
    "chestSize": "Waist: 32-40\", Hip: 44-52\"",
    "lengthSize": "Long: 14\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Original Print",
        "nameBn": "অরিজিনাল প্রিন্ট",
        "hex": "#E11D48"
      }
    ],
    "inStock": true,
    "stockCount": 15,
    "rating": 4.9,
    "reviewCount": 33,
    "image": "/assets/products/153.jpg",
    "galleryImages": [
      "/assets/products/153.jpg"
    ],
    "description": "Long 14-inch cut with polka dot pattern. 100% pure export combed cotton for summer lounging. Waist: 32-40\", Hip: 44-52\", Long: 14\".",
    "descriptionBn": "১০০% পিওর কটন এক্সপোর্ট লাউঞ্জ শর্টস। গরমে ঘরে পরার জন্য সম্পূর্ণ আরামদায়ক। মেজারমেন্ট — কোমর: 32-40\", হিপ: 44-52\", ঝুল: 14\"।",
    "badge": "Offer ৳130",
    "badgeBn": "ধামাকা অফার ১৩০৳",
    "isBestSeller": false
  },
  {
    "id": "shorts-154",
    "name": "Safari Leopard Print Long Shorts",
    "nameBn": "সাফারি লেপার্ড লং লাউঞ্জ শর্টস",
    "category": "shorts",
    "categoryLabelBn": "কটন শর্টস (১৩০৳)",
    "price": 130,
    "originalPrice": 220,
    "fabric": "100% Pure Export Cotton (Breathable)",
    "gsm": 180,
    "chestSize": "Waist: 32-40\", Hip: 44-52\"",
    "lengthSize": "Long: 14\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Original Print",
        "nameBn": "অরিজিনাল প্রিন্ট",
        "hex": "#E11D48"
      }
    ],
    "inStock": true,
    "stockCount": 15,
    "rating": 4.9,
    "reviewCount": 34,
    "image": "/assets/products/154.jpg",
    "galleryImages": [
      "/assets/products/154.jpg"
    ],
    "description": "Comfortable 14-inch length leopard print. 100% pure export combed cotton for summer lounging. Waist: 32-40\", Hip: 44-52\", Long: 14\".",
    "descriptionBn": "১০০% পিওর কটন এক্সপোর্ট লাউঞ্জ শর্টস। গরমে ঘরে পরার জন্য সম্পূর্ণ আরামদায়ক। মেজারমেন্ট — কোমর: 32-40\", হিপ: 44-52\", ঝুল: 14\"।",
    "badge": "Offer ৳130",
    "badgeBn": "ধামাকা অফার ১৩০৳",
    "isBestSeller": false
  },
  {
    "id": "shorts-155",
    "name": "Dainty Blue Flora Sleep Shorts",
    "nameBn": "ডেইন্টি ব্লু ফ্লোরা স্লিপ শর্টস",
    "category": "shorts",
    "categoryLabelBn": "কটন শর্টস (১৩০৳)",
    "price": 130,
    "originalPrice": 220,
    "fabric": "100% Pure Export Cotton (Breathable)",
    "gsm": 180,
    "chestSize": "Waist: 32-38\", Hip: 40-48\"",
    "lengthSize": "Long: 12\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Original Print",
        "nameBn": "অরিজিনাল প্রিন্ট",
        "hex": "#E11D48"
      }
    ],
    "inStock": true,
    "stockCount": 15,
    "rating": 4.9,
    "reviewCount": 35,
    "image": "/assets/products/155.jpg",
    "galleryImages": [
      "/assets/products/155.jpg"
    ],
    "description": "White base with micro blue floral pattern. 100% pure export combed cotton for summer lounging. Waist: 32-38\", Hip: 40-48\", Long: 12\".",
    "descriptionBn": "১০০% পিওর কটন এক্সপোর্ট লাউঞ্জ শর্টস। গরমে ঘরে পরার জন্য সম্পূর্ণ আরামদায়ক। মেজারমেন্ট — কোমর: 32-38\", হিপ: 40-48\", ঝুল: 12\"।",
    "badge": "Offer ৳130",
    "badgeBn": "ধামাকা অফার ১৩০৳",
    "isBestSeller": false
  },
  {
    "id": "shorts-156",
    "name": "Plus Size Botanical Garden Shorts",
    "nameBn": "প্লাস সাইজ ফ্লোরাল গার্ডেন শর্টস",
    "category": "shorts",
    "categoryLabelBn": "কটন শর্টস (১৩০৳)",
    "price": 130,
    "originalPrice": 220,
    "fabric": "100% Pure Export Cotton (Breathable)",
    "gsm": 180,
    "chestSize": "Waist: 34-42\", Hip: 44-54\"",
    "lengthSize": "Long: 12\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Original Print",
        "nameBn": "অরিজিনাল প্রিন্ট",
        "hex": "#E11D48"
      }
    ],
    "inStock": true,
    "stockCount": 15,
    "rating": 4.9,
    "reviewCount": 36,
    "image": "/assets/products/156.jpg",
    "galleryImages": [
      "/assets/products/156.jpg"
    ],
    "description": "Spacious fit with blooming floral garden print. 100% pure export combed cotton for summer lounging. Waist: 34-42\", Hip: 44-54\", Long: 12\".",
    "descriptionBn": "১০০% পিওর কটন এক্সপোর্ট লাউঞ্জ শর্টস। গরমে ঘরে পরার জন্য সম্পূর্ণ আরামদায়ক। মেজারমেন্ট — কোমর: 34-42\", হিপ: 44-54\", ঝুল: 12\"।",
    "badge": "Offer ৳130",
    "badgeBn": "ধামাকা অফার ১৩০৳",
    "isBestSeller": false
  },
  {
    "id": "shorts-157",
    "name": "Ultra Stretch Mega Plus Floral Shorts",
    "nameBn": "মেগা প্লাস ইয়েলো ফ্লোরাল শর্টস",
    "category": "shorts",
    "categoryLabelBn": "কটন শর্টস (১৩০৳)",
    "price": 130,
    "originalPrice": 220,
    "fabric": "100% Pure Export Cotton (Breathable)",
    "gsm": 180,
    "chestSize": "Waist: 36-48\", Hip: 50-60\"",
    "lengthSize": "Long: 12\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "Original Print",
        "nameBn": "অরিজিনাল প্রিন্ট",
        "hex": "#E11D48"
      }
    ],
    "inStock": true,
    "stockCount": 15,
    "rating": 4.9,
    "reviewCount": 37,
    "image": "/assets/products/157.jpg",
    "galleryImages": [
      "/assets/products/157.jpg"
    ],
    "description": "Super wide waist 36-48 and hip up to 60 inches. 100% pure export combed cotton for summer lounging. Waist: 36-48\", Hip: 50-60\", Long: 12\".",
    "descriptionBn": "১০০% পিওর কটন এক্সপোর্ট লাউঞ্জ শর্টস। গরমে ঘরে পরার জন্য সম্পূর্ণ আরামদায়ক। মেজারমেন্ট — কোমর: 36-48\", হিপ: 50-60\", ঝুল: 12\"।",
    "badge": "Offer ৳130",
    "badgeBn": "ধামাকা অফার ১৩০৳",
    "isBestSeller": false
  },
  {
    "id": "combo-3-summer-shorts",
    "name": "3-Piece Summer Cotton Shorts Saver Combo",
    "nameBn": "৩টি সামার কটন শর্টস সুপার সেভার কম্বো",
    "category": "combos",
    "categoryLabelBn": "কম্বো ও সেট 🔥",
    "price": 360,
    "originalPrice": 660,
    "fabric": "100% Export Pure Combed Cotton (Pack of 3)",
    "gsm": 180,
    "chestSize": "Waist: 28\"-38\" (Free Size)",
    "lengthSize": "Long: 12\"-14\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "3-Color Summer Assortment",
        "nameBn": "৩টি আকর্ষণীয় প্রিন্ট কম্বো",
        "hex": "#E11D48"
      }
    ],
    "inStock": true,
    "stockCount": 35,
    "rating": 5,
    "reviewCount": 118,
    "image": "/assets/products/130.jpg",
    "galleryImages": [
      "/assets/products/130.jpg",
      "/assets/products/133.jpg",
      "/assets/products/136.jpg"
    ],
    "description": "Super value bundle of 3 premium pure cotton summer shorts. Pick your favorite designs or receive 3 bestselling assorted prints.",
    "descriptionBn": "৩টি পিওর কটন লাউঞ্জ শর্টসের সুপার সেভার কম্বো প্যাক। ছবি থেকে আপনার পছন্দের ৩টি ডিজাইন নিতে পারবেন অথবা আমাদের বেস্টসেলার ৩টি প্রিন্ট দেওয়া হবে। মাত্র ৩৬০ টাকায় ৩টি শর্টস!",
    "badge": "Super Saver ৳360",
    "badgeBn": "সুপার সেভার ৩৬০৳",
    "isBestSeller": true
  },
  {
    "id": "combo-4-thong-panty-box",
    "name": "4-Piece Premium Lace & Cotton Panty Multi-Pack",
    "nameBn": "৪টি পিওর কটন ও লেইস প্যান্টি কম্বো বক্স",
    "category": "combos",
    "categoryLabelBn": "কম্বো ও সেট 🔥",
    "price": 399,
    "originalPrice": 700,
    "fabric": "100% Soft Cotton & Breathable Lace (Pack of 4)",
    "gsm": 180,
    "chestSize": "Waist: 28\"-40\" (Free Size / XL)",
    "lengthSize": "Full Coverage & Hipster",
    "availableSizes": [
      "Regular",
      "Plus Size (38-46)"
    ],
    "colors": [
      {
        "name": "4 Pastel Shades Assortment",
        "nameBn": "৪টি প্যাস্টেল শেডস",
        "hex": "#F472B6"
      }
    ],
    "inStock": true,
    "stockCount": 25,
    "rating": 4.9,
    "reviewCount": 88,
    "image": "/assets/products/094.jpg",
    "galleryImages": [
      "/assets/products/094.jpg",
      "/assets/products/095.jpg",
      "/assets/products/107.jpg",
      "/assets/products/118.jpg"
    ],
    "description": "4-piece premium panty bundle featuring 100% sensitive skin pure cotton and delicate floral lace styles.",
    "descriptionBn": "৪টি প্রিমিয়াম কটন ও লেইস প্যান্টির স্পেশাল কম্বো বক্স। স্কিন-ফ্রেন্ডলি সুতি ও নরম লেইস ডিজাইন। মাত্র ৩৯৯ টাকায় ৪টি প্যান্টির আকর্ষণীয় প্যাকেজ।",
    "badge": "Special ৳399 Box",
    "badgeBn": "স্পেশাল ৩৯৯৳ বক্স",
    "isBestSeller": true
  },
  {
    "id": "combo-5-shorts-mega-pack",
    "name": "5-Piece Cotton Summer Shorts Mega Pack (Free Shipping)",
    "nameBn": "৫টি কটন সামার শর্টস মেগা প্যাক (ফ্রি ডেলিভারি)",
    "category": "combos",
    "categoryLabelBn": "কম্বো ও সেট 🔥",
    "price": 590,
    "originalPrice": 1100,
    "fabric": "100% Pure Combed Cotton (Pack of 5)",
    "gsm": 180,
    "chestSize": "Waist: 28\"-42\" (Free Size)",
    "lengthSize": "Long: 12\"-15\"",
    "availableSizes": [
      "Regular",
      "Free Size"
    ],
    "colors": [
      {
        "name": "5 Bestseller Prints",
        "nameBn": "৫টি বেস্টসেলার প্রিন্ট কালেকশন",
        "hex": "#E11D48"
      }
    ],
    "inStock": true,
    "stockCount": 20,
    "rating": 5,
    "reviewCount": 96,
    "image": "/assets/products/136.jpg",
    "galleryImages": [
      "/assets/products/136.jpg",
      "/assets/products/124.jpg",
      "/assets/products/130.jpg",
      "/assets/products/141.jpg",
      "/assets/products/147.jpg"
    ],
    "description": "Mega saver pack of 5 pure cotton summer shorts with free home delivery. Ultimate comfort for the entire summer.",
    "descriptionBn": "৫টি এক্সপোর্ট কটন লাউঞ্জ শর্টসের মেগা সেভার প্যাক সাথে ফ্রি হোম ডেলিভারি! পুরো গরমের সেরা আরামদায়ক সঙ্গী। মাত্র ৫৯০ টাকায় ৫টি শর্টস!",
    "badge": "Free Delivery Offer",
    "badgeBn": "ফ্রি ডেলিভারি অফার",
    "isBestSeller": true
  }
];
