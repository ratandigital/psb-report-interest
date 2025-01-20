type Upazila = {
  
  branchName: string;
  branchCode: string;
}; // Define the Upazila type, matching the branchName and branchCode structure

type District = {
  [districtName: string]: Upazila[]; // Districts are objects with keys being district names and values being arrays of Upazilas
};

type Division = {
  districts: District; // Divisions are objects containing a 'districts' field
};

// Define the type for BangladeshData, which is an object with division names as keys
type BangladeshData = {
  [divisionName: string]: Division;
};

// Your actual data
const bangladeshData: BangladeshData = {
  "DHAKA": {
    districts: {
      "DHAKA": [
        {
          "branchName": "Head Office Dhaka",
          "branchCode": "1001"
        },
        {
          "branchName": "Dhaka Corporate Branch",
          "branchCode": "1010"
        },
        {
          "branchName": "Dhaka District Office",
          "branchCode": "1007"
        },
        {
          "branchName": "Dhamrai",
          "branchCode": "1002"
        },
        {
          "branchName": "Keraniganj",
          "branchCode": "1004"
        },
        {
          "branchName": "Savar",
          "branchCode": "1005"
        },
        {
          "branchName": "Nawabganj Dhaka",
          "branchCode": "1006"
        },
        {
          "branchName": "Dohar",
          "branchCode": "1003"
        }
      ],
      "NARSINGDI": [
        {
          "branchName": "Raipura",
          "branchCode": "2205"
        },
        {
          "branchName": "Belabo Narshingdi",
          "branchCode": "2201"
        },
        {
          "branchName": "Monohardi",
          "branchCode": "2202"
        },
        {
          "branchName": "Shibpur",
          "branchCode": "2206"
        },
        {
          "branchName": "Narsingdi Sadar",
          "branchCode": "2203"
        },
        {
          "branchName": "Palash",
          "branchCode": "2204"
        },
        {
          "branchName": "Norshingdi District Office",
          "branchCode": "2200"
        }
      ],
      "SHARIATPUR": [
        {
          "branchName": "Bhedarganj",
          "branchCode": "2401"
        },
        {
          "branchName": "Naria Shariatpur",
          "branchCode": "2404"
        },
        {
          "branchName": "Zajira",
          "branchCode": "2406"
        },
        {
          "branchName": "Shariatpur Sadar",
          "branchCode": "2405"
        },
        {
          "branchName": "Gosairhat Sariatpur",
          "branchCode": "2403"
        },
        {
          "branchName": "Damudiya SHARIATPUR",
          "branchCode": "2402"
        },
        {
          "branchName": "Shariatpur District Office",
          "branchCode": "2400"
        }
      ],
      "FARIDPUR": [
        {
          "branchName": "Saltha Faridpur",
          "branchCode": "1109"
        },
        {
          "branchName": "Boalmari",
          "branchCode": "1103"
        },
        {
          "branchName": "Nagarkanda",
          "branchCode": "1107"
        },
        {
          "branchName": "Madhukhali FARIDPUR",
          "branchCode": "1106"
        },
        {
          "branchName": "Alfadanga Faridpur",
          "branchCode": "1101"
        },
        {
          "branchName": "Sadarpur",
          "branchCode": "1108"
        },
        {
          "branchName": "Faridpur Sadar",
          "branchCode": "1105"
        },
        {
          "branchName": "Bhanga",
          "branchCode": "1102"
        },
        {
          "branchName": "Char Bhadrasan",
          "branchCode": "1104"
        },
        {
          "branchName": "Faridpur District Office",
          "branchCode": "1100"
        },
        {
          "branchName": "Faridpur Audit Office",
          "branchCode": "9008"
        }
      ],
      "RAJBARI": [
        {
          "branchName": "Rajbari Sadar",
          "branchCode": "2305"
        },
        {
          "branchName": "Pangsha",
          "branchCode": "2304"
        },
        {
          "branchName": "Kalukhale RAJBARI",
          "branchCode": "2303"
        },
        {
          "branchName": "Baliakandi",
          "branchCode": "2301"
        },
        {
          "branchName": "Goalunda",
          "branchCode": "2302"
        },
        {
          "branchName": "Rajbari District Office",
          "branchCode": "2300"
        }
      ],
      "TANGAIL": [
        {
          "branchName": "Ghatail",
          "branchCode": "2605"
        },
        {
          "branchName": "Delduar",
          "branchCode": "2603"
        },
        {
          "branchName": "Shakhipur",
          "branchCode": "2611"
        },
        {
          "branchName": "Bashail",
          "branchCode": "2601"
        },
        {
          "branchName": "Tangail Sadar",
          "branchCode": "2612"
        },
        {
          "branchName": "Gopalpur",
          "branchCode": "2606"
        },
        {
          "branchName": "Kalihati",
          "branchCode": "2607"
        },
        {
          "branchName": "Modhupur",
          "branchCode": "2609"
        },
        {
          "branchName": "Nagarpur",
          "branchCode": "2610"
        },
        {
          "branchName": "Dhanbari Tangail",
          "branchCode": "2604"
        },
        {
          "branchName": "Tangail District Office",
          "branchCode": "2600"
        }
      ],
      "MANIKGANJ": [
        {
          "branchName": "Saturia",
          "branchCode": "1704"
        },
        {
          "branchName": "Manikganj Sadar",
          "branchCode": "1703"
        },
        {
          "branchName": "Singair",
          "branchCode": "1706"
        },
        {
          "branchName": "Harirampur MANIKGANJ",
          "branchCode": "1702"
        },
        {
          "branchName": "Daulatpur Manikganj",
          "branchCode": "1707"
        },
        {
          "branchName": "Ghior",
          "branchCode": "1701"
        },
        {
          "branchName": "Shibalaya Manikganj",
          "branchCode": "1705"
        },
        {
          "branchName": "Manikganj District Office",
          "branchCode": "1700"
        }
      ],
      "GOPALGANJ": [
        {
          "branchName": "Gopalganj Sadar",
          "branchCode": "1301"
        },
        {
          "branchName": "Kasiani",
          "branchCode": "1302"
        },
        {
          "branchName": "Maksudpur",
          "branchCode": "1304"
        },
        {
          "branchName": "Kotalipara",
          "branchCode": "1303"
        },
        {
          "branchName": "Tungipara",
          "branchCode": "1305"
        },
        {
          "branchName": "Gopalganj District Office",
          "branchCode": "1300"
        }
      ],
      "GAZIPUR": [
        {
          "branchName": "Sreepur Gazipur",
          "branchCode": "1205"
        },
        {
          "branchName": "Kapasia",
          "branchCode": "1203"
        },
        {
          "branchName": "Gazipur Sadar",
          "branchCode": "1201"
        },
        {
          "branchName": "Kaliganj (GZPR)",
          "branchCode": "1204"
        },
        {
          "branchName": "Kaliakoir",
          "branchCode": "1202"
        },
        {
          "branchName": "Gazipur District Office",
          "branchCode": "1200"
        }
      ],
      "KISHOREGANJ": [
        {
          "branchName": "Bajitpur Kishoreganj",
          "branchCode": "1502"
        },
        {
          "branchName": "Bhairab",
          "branchCode": "1503"
        },
        {
          "branchName": "Hosainpur",
          "branchCode": "1504"
        },
        {
          "branchName": "Pakundia",
          "branchCode": "1512"
        },
        {
          "branchName": "Mithamain",
          "branchCode": "1510"
        },
        {
          "branchName": "Kishoreganj District Office",
          "branchCode": "1500"
        },
        {
          "branchName": "Katiadi KISHOREGANJ",
          "branchCode": "1507"
        },
        {
          "branchName": "Itna",
          "branchCode": "1505"
        },
        {
          "branchName": "Austogram",
          "branchCode": "1501"
        },
        {
          "branchName": "Nikli Kishoreganj",
          "branchCode": "1511"
        },
        {
          "branchName": "Karimganj Kishoreganj",
          "branchCode": "1506"
        },
        {
          "branchName": "Tarail",
          "branchCode": "1513"
        },
        {
          "branchName": "Kuliarchar Kishoreganj",
          "branchCode": "1509"
        }
      ],
      "NARAYANGONJ": [
        {
          "branchName": "Bandar",
          "branchCode": "2002"
        },
        {
          "branchName": "Sonargaon",
          "branchCode": "2005"
        },
        {
          "branchName": "Rupganj",
          "branchCode": "2004"
        },
        {
          "branchName": "Narayanganj Sadar",
          "branchCode": "2003"
        },
        {
          "branchName": "Araihazar",
          "branchCode": "2001"
        },
        {
          "branchName": "Narayanganj District Office",
          "branchCode": "2000"
        }
      ],
      "MADARIPUR": [
        {
          "branchName": "Shibchar MADARIPUR",
          "branchCode": "1604"
        },
        {
          "branchName": "Kalkini MADARIPUR",
          "branchCode": "1601"
        },
        {
          "branchName": "Madaripur Sadar",
          "branchCode": "1602"
        },
        {
          "branchName": "Madaripur District Office",
          "branchCode": "1600"
        }
      ],
      "MUNSHIGANJ": [
        {
          "branchName": "Tangibari",
          "branchCode": "1806"
        },
        {
          "branchName": "Serajdikhan",
          "branchCode": "1804"
        },
        {
          "branchName": "Gazaria",
          "branchCode": "1801"
        },
        {
          "branchName": "Lauhajang",
          "branchCode": "1802"
        },
        {
          "branchName": "Munshiganj Sadar",
          "branchCode": "1803"
        },
        {
          "branchName": "Sreenagar",
          "branchCode": "1805"
        },
        {
          "branchName": "Munshiganj District Office",
          "branchCode": "1800"
        }
      ]
    }
  },
  "BARISAL": {
  districts: {
    "PATUAKHALI": [
      {
        "branchName": "Galachipa",
        "branchCode": "3104"
      },
      {
        "branchName": "Dasmina Patuakhali",
        "branchCode": "3102"
      },
      {
        "branchName": "Kalapara Patuakhali",
        "branchCode": "3105"
      },
      {
        "branchName": "Patuakhali Sadar",
        "branchCode": "3107"
      },
      {
        "branchName": "Bauphal",
        "branchCode": "3101"
      },
      {
        "branchName": "Dumki",
        "branchCode": "3103"
      },
      {
        "branchName": "Mirjaganj Patuakhali",
        "branchCode": "3106"
      },
      {
        "branchName": "Rangabali Patuakhali",
        "branchCode": "3108"
      },
      {
        "branchName": "Patuakhali District Office",
        "branchCode": "3100"
      },
      {
        "branchName": "Patuakhali Audit Office",
        "branchCode": "9002"
      }
    ],
    "BARGUNA": [
      {
        "branchName": "Amtali",
        "branchCode": "2701"
      },
      {
        "branchName": "Taltaly",
        "branchCode": "2706"
      },
      {
        "branchName": "Bamna",
        "branchCode": "2702"
      },
      {
        "branchName": "Patharghata",
        "branchCode": "2705"
      },
      {
        "branchName": "Betagi",
        "branchCode": "2704"
      },
      {
        "branchName": "Barguna Sadar",
        "branchCode": "2703"
      },
      {
        "branchName": "Barguna District Office",
        "branchCode": "2700"
      }
    ],
    "BHOLA": [
      {
        "branchName": "Manpura Bhola",
        "branchCode": "2906"
      },
      {
        "branchName": "Bhola Sadar",
        "branchCode": "2901"
      },
      {
        "branchName": "Charfession",
        "branchCode": "2903"
      },
      {
        "branchName": "Borhanuddin Bhola",
        "branchCode": "2902"
      },
      {
        "branchName": "Daulatkhan Bhola",
        "branchCode": "2904"
      },
      {
        "branchName": "Tajumuddin",
        "branchCode": "2907"
      },
      {
        "branchName": "Lalmohan",
        "branchCode": "2905"
      },
      {
        "branchName": "Bhola District Office",
        "branchCode": "2900"
      }
    ],
    "JHALOKATHI": [
      {
        "branchName": "Rajapur",
        "branchCode": "3004"
      },
      {
        "branchName": "Nalchiti Jhalokathi",
        "branchCode": "3003"
      },
      {
        "branchName": "Jhalokathi Sadar",
        "branchCode": "3001"
      },
      {
        "branchName": "Kathalia",
        "branchCode": "3002"
      },
      {
        "branchName": "Jhalokathi District Office",
        "branchCode": "3000"
      }
    ],
    "PEROJPUR": [
      {
        "branchName": "Mothbaria Perojpur",
        "branchCode": "3203"
      },
      {
        "branchName": "Kaukhali Perojpur",
        "branchCode": "3202"
      },
      {
        "branchName": "Perojpur Sadar",
        "branchCode": "3206"
      },
      {
        "branchName": "Bhandaria",
        "branchCode": "3201"
      },
      {
        "branchName": "Nesarabad (Shawrupkathi)",
        "branchCode": "3205"
      },
      {
        "branchName": "Zia Nagar Perojpur",
        "branchCode": "3207"
      },
      {
        "branchName": "Nazirpur Perojpur",
        "branchCode": "3204"
      },
      {
        "branchName": "Perojpur District Office",
        "branchCode": "3200"
      },
      {
        "branchName": "Perojpur Audit Office",
        "branchCode": "9001"
      }
    ],
    "BARISAL": [
      {
        "branchName": "Muladi",
        "branchCode": "2809"
      },
      {
        "branchName": "Wazirpur",
        "branchCode": "2810"
      },
      {
        "branchName": "Banaripara",
        "branchCode": "2804"
      },
      {
        "branchName": "Bakerganj",
        "branchCode": "2803"
      },
      {
        "branchName": "Agailjhara",
        "branchCode": "2801"
      },
      {
        "branchName": "Gournadi",
        "branchCode": "2806"
      },
      {
        "branchName": "Babuganj Barisal",
        "branchCode": "2802"
      },
      {
        "branchName": "Barisal Sadar",
        "branchCode": "2805"
      },
      {
        "branchName": "Hijla",
        "branchCode": "2807"
      },
      {
        "branchName": "Barisal District Office",
        "branchCode": "2800"
      },
      {
        "branchName": "Barisal Audit Office",
        "branchCode": "9020"
      }
    ]
  }
},

"CHITTAGONG": {
  districts: {
    "COMILLA": [
      {
        "branchName": "Muradnagar",
        "branchCode": "3714"
      },
      {
        "branchName": "Debiduar",
        "branchCode": "3709"
      },
      {
        "branchName": "Chandina",
        "branchCode": "3704"
      },
      {
        "branchName": "Meghna",
        "branchCode": "3712"
      },
      {
        "branchName": "Brahmanpara COMILLA",
        "branchCode": "3702"
      },
      {
        "branchName": "Comilla Sadar South",
        "branchCode": "3706"
      },
      {
        "branchName": "Comilla Sadar",
        "branchCode": "3707"
      },
      {
        "branchName": "Titas",
        "branchCode": "3716"
      },
      {
        "branchName": "Ramganj",
        "branchCode": "4104"
      },
      {
        "branchName": "Chowddagram",
        "branchCode": "3705"
      },
      {
        "branchName": "Faridganj Chandpur",
        "branchCode": "3502"
      },
      {
        "branchName": "Homna Comilla",
        "branchCode": "3710"
      },
      {
        "branchName": "Daudkandi",
        "branchCode": "3708"
      },
      {
        "branchName": "Nangolkot",
        "branchCode": "3715"
      },
      {
        "branchName": "Burichang",
        "branchCode": "3703"
      },
      {
        "branchName": "Monoharganj",
        "branchCode": "3713"
      },
      {
        "branchName": "Laksam",
        "branchCode": "3711"
      },
      {
        "branchName": "Comilla District Office",
        "branchCode": "3700"
      }
    ],
    "BRAHMANBARIA": [
      {
        "branchName": "Nabinagar",
        "branchCode": "3407"
      },
      {
        "branchName": "Brahmanbaria Sadar",
        "branchCode": "3405"
      },
      {
        "branchName": "Sarail",
        "branchCode": "3409"
      },
      {
        "branchName": "Bancharampur",
        "branchCode": "3403"
      },
      {
        "branchName": "Kashba",
        "branchCode": "3406"
      },
      {
        "branchName": "Bijoy Nagor",
        "branchCode": "3404"
      },
      {
        "branchName": "Ashuganj",
        "branchCode": "3402"
      },
      {
        "branchName": "Akhaura Brahmanbaria",
        "branchCode": "3401"
      },
      {
        "branchName": "Brahmanbaria District Office",
        "branchCode": "3400"
      }
    ],
    "CHANDPUR": [
      {
        "branchName": "Hajiganj",
        "branchCode": "3504"
      },
      {
        "branchName": "Matlab (North) (Chengarchar)",
        "branchCode": "3505"
      },
      {
        "branchName": "Faridganj Chandpur",
        "branchCode": "3502"
      },
      {
        "branchName": "Kachua CHAND",
        "branchCode": "3508"
      },
      {
        "branchName": "Shahrasti",
        "branchCode": "3507"
      },
      {
        "branchName": "Chandpur Sadar",
        "branchCode": "3501"
      },
      {
        "branchName": "Matlab (South)",
        "branchCode": "3506"
      },
      {
        "branchName": "Chandpur District Office",
        "branchCode": "3500"
      },
      {
        "branchName": "Chandpur Audit Office",
        "branchCode": "9004"
      }
    ],
    "CHITTAGONG": [
      {
        "branchName": "Sandwip",
        "branchCode": "3611"
      },
      {
        "branchName": "Mirsarai",
        "branchCode": "3607"
      },
      {
        "branchName": "Fatikchari",
        "branchCode": "3605"
      },
      {
        "branchName": "Rangunia",
        "branchCode": "3609"
      },
      {
        "branchName": "Anwara CHITTAGONG",
        "branchCode": "3601"
      },
      {
        "branchName": "Hathazari",
        "branchCode": "3606"
      },
      {
        "branchName": "Lohagara Ctg.",
        "branchCode": "3614"
      },
      {
        "branchName": "Banshkhali",
        "branchCode": "3602"
      },
      {
        "branchName": "Sitakundu",
        "branchCode": "3613"
      },
      {
        "branchName": "Boalkhali",
        "branchCode": "3603"
      },
      {
        "branchName": "Raujan",
        "branchCode": "3610"
      },
      {
        "branchName": "Chittagong Audit Office",
        "branchCode": "9003"
      },
      {
        "branchName": "Chittagong District Office",
        "branchCode": "3600"
      }
    ],
    "COX'S BAZAR": [
      {
        "branchName": "Chakoria",
        "branchCode": "3808"
      },
      {
        "branchName": "Ukhia",
        "branchCode": "3807"
      },
      {
        "branchName": "Moheshkhali",
        "branchCode": "3803"
      },
      {
        "branchName": "Ramu",
        "branchCode": "3805"
      },
      {
        "branchName": "Teknaf Cox's Bazar",
        "branchCode": "3806"
      },
      {
        "branchName": "Kutubdia",
        "branchCode": "3802"
      },
      {
        "branchName": "Coxs Bazar Sadar",
        "branchCode": "3801"
      },
      {
        "branchName": "Pekua",
        "branchCode": "3804"
      },
      {
        "branchName": "Coxs Bazar District Office",
        "branchCode": "3800"
      }
    ],
    "FENI": [
      {
        "branchName": "Feni Sadar",
        "branchCode": "3903"
      },
      {
        "branchName": "Chagalnayya",
        "branchCode": "3901"
      },
      {
        "branchName": "Fulgazi",
        "branchCode": "3904"
      },
      {
        "branchName": "Daganbhuiyan",
        "branchCode": "3902"
      },
      {
        "branchName": "Sonagazi",
        "branchCode": "3906"
      },
      {
        "branchName": "Parshuram",
        "branchCode": "3905"
      },
      {
        "branchName": "Feni District Office",
        "branchCode": "3900"
      }
    ],
    "KHAGRACHARI": [
      {
        "branchName": "Manikchari",
        "branchCode": "4004"
      },
      {
        "branchName": "Matiranga",
        "branchCode": "4005"
      },
      {
        "branchName": "Khagrachari Sadar",
        "branchCode": "4002"
      },
      {
        "branchName": "Panchari KHAGRACHARI",
        "branchCode": "4007"
      },
      {
        "branchName": "Ramgarh KHAGRACHARI",
        "branchCode": "4008"
      },
      {
        "branchName": "Guimara",
        "branchCode": "4009"
      },
      {
        "branchName": "Khagrachari District Office",
        "branchCode": "4000"
      },
      {
        "branchName": "Khagrachari Audit Office",
        "branchCode": "9005"
      }
    ],
    "RANGAMATI": [
      {
        "branchName": "Langadu",
        "branchCode": "4307"
      },
      {
        "branchName": "Baghaichari",
        "branchCode": "4301"
      },
      {
        "branchName": "Naniarchar",
        "branchCode": "4308"
      },
      {
        "branchName": "Belaichari",
        "branchCode": "4303"
      },
      {
        "branchName": "Jurachari",
        "branchCode": "4304"
      },
      {
        "branchName": "Rangamati Sadar",
        "branchCode": "4310"
      },
      {
        "branchName": "Kaptai Rangamati",
        "branchCode": "4305"
      },
      {
        "branchName": "Rajasthali",
        "branchCode": "4309"
      },
      {
        "branchName": "Kawkhali",
        "branchCode": "4306"
      },
      {
        "branchName": "Barkal",
        "branchCode": "4302"
      },
      {
        "branchName": "Rangamati District Office",
        "branchCode": "4300"
      }
    ],
    "LAKSMIPUR": [
      {
        "branchName": "Ramganj",
        "branchCode": "4104"
      },
      {
        "branchName": "Laksmipur Sadar",
        "branchCode": "4102"
      },
      {
        "branchName": "Raipur",
        "branchCode": "4103"
      },
      {
        "branchName": "Kamalnagar LAKSMIPUR",
        "branchCode": "4105"
      },
      {
        "branchName": "Laksmipur District Office",
        "branchCode": "4100"
      }
    ],
    "NOAKHALI": [
      {
        "branchName": "Subarnachar",
        "branchCode": "4209"
      },
      {
        "branchName": "Hatiya",
        "branchCode": "4204"
      },
      {
        "branchName": "Kabir Hat",
        "branchCode": "4205"
      },
      {
        "branchName": "Chatkhil",
        "branchCode": "4202"
      },
      {
        "branchName": "Sonaimuri",
        "branchCode": "4208"
      },
      {
        "branchName": "Noakhali Sadar(Sudharam)",
        "branchCode": "4206"
      },
      {
        "branchName": "Companiganj",
        "branchCode": "4203"
      },
      {
        "branchName": "Begumganj",
        "branchCode": "4201"
      },
      {
        "branchName": "Noakhali District Office",
        "branchCode": "4200"
      },
      {
        "branchName": "Noakhali Audit Office",
        "branchCode": "9019"
      }
    ],
    "BANDARBAN": [
      {
        "branchName": "Lama",
        "branchCode": "3303"
      },
      {
        "branchName": "Rawanchari",
        "branchCode": "3305"
      },
      {
        "branchName": "Nakhoyngchari",
        "branchCode": "3304"
      },
      {
        "branchName": "Ali Kadam",
        "branchCode": "3301"
      },
      {
        "branchName": "Ruma",
        "branchCode": "3306"
      },
      {
        "branchName": "Thanchi Bandarban",
        "branchCode": "3307"
      },
      {
        "branchName": "Bandarban District Office",
        "branchCode": "3300"
      },
      {
        "branchName": "Bandarban Audit Office",
        "branchCode": "9022"
      }
    ]
  }
},
"KHULNA": {
  districts: {
    "JESSORE": [
      {
        "branchName": "Jhikargacha",
        "branchCode": "4605"
      },
      {
        "branchName": "Chowgacha",
        "branchCode": "4603"
      },
      {
        "branchName": "Sharsha",
        "branchCode": "4608"
      },
      {
        "branchName": "Keshabpur",
        "branchCode": "4606"
      },
      {
        "branchName": "Jessore Sadar",
        "branchCode": "4604"
      },
      {
        "branchName": "Manirampur",
        "branchCode": "4607"
      },
      {
        "branchName": "Abhoynagar",
        "branchCode": "4601"
      },
      {
        "branchName": "Bagherpara",
        "branchCode": "4602"
      },
      {
        "branchName": "Jessore District Office",
        "branchCode": "4600"
      },
      {
        "branchName": "Jessore Audit Office",
        "branchCode": "9010"
      }
    ],
    "SATKHIRA": [
      {
        "branchName": "Satkhira Sadar",
        "branchCode": "5304"
      },
      {
        "branchName": "Shyamnagar",
        "branchCode": "5305"
      },
      {
        "branchName": "Kaliganj",
        "branchCode": "5307"
      },
      {
        "branchName": "Kolaroa",
        "branchCode": "5303"
      },
      {
        "branchName": "Assasuni",
        "branchCode": "5301"
      },
      {
        "branchName": "Tala",
        "branchCode": "5306"
      },
      {
        "branchName": "Debhata",
        "branchCode": "5302"
      },
      {
        "branchName": "Satkhira District Office",
        "branchCode": "5300"
      },
      {
        "branchName": "Satkhira Audit Office",
        "branchCode": "9009"
      }
    ],
    "CHUADANGA": [
      {
        "branchName": "Alamdanga",
        "branchCode": "4501"
      },
      {
        "branchName": "Damurhuda",
        "branchCode": "4503"
      },
      {
        "branchName": "Chuadanga Sadar",
        "branchCode": "4502"
      },
      {
        "branchName": "Jibannagar",
        "branchCode": "4504"
      },
      {
        "branchName": "Chuadanga District Office",
        "branchCode": "4500"
      }
    ],
    "KUSHTIA": [
      {
        "branchName": "Daulatpur",
        "branchCode": "4902"
      },
      {
        "branchName": "Kumarkhali",
        "branchCode": "4904"
      },
      {
        "branchName": "Kushtia Sadar",
        "branchCode": "4905"
      },
      {
        "branchName": "Bheramara",
        "branchCode": "4901"
      },
      {
        "branchName": "Khoksha",
        "branchCode": "4903"
      },
      {
        "branchName": "Mirpur",
        "branchCode": "4906"
      },
      {
        "branchName": "Kushtia District Office",
        "branchCode": "4900"
      }
    ],
    "MAGURA": [
      {
        "branchName": "Sreepur",
        "branchCode": "5004"
      },
      {
        "branchName": "Magura Sadar",
        "branchCode": "5001"
      },
      {
        "branchName": "Shalikha",
        "branchCode": "5003"
      },
      {
        "branchName": "Mohammadpur",
        "branchCode": "5002"
      },
      {
        "branchName": "Magura District Office",
        "branchCode": "5000"
      }
    ],
    "JHENAIDAH": [
      {
        "branchName": "Moheshpur",
        "branchCode": "4704"
      },
      {
        "branchName": "Shailkupa",
        "branchCode": "4705"
      },
      {
        "branchName": "Kaliganj",
        "branchCode": "4706"
      },
      {
        "branchName": "Jhenaidah Sadar",
        "branchCode": "4702"
      },
      {
        "branchName": "Harinakunda",
        "branchCode": "4701"
      },
      {
        "branchName": "Kotchandpur",
        "branchCode": "4703"
      },
      {
        "branchName": "Jhenaidah District Office",
        "branchCode": "4700"
      },
      {
        "branchName": "Jhenaidah Audit Office",
        "branchCode": "9024"
      }
    ],
    "MEHERPUR": [
      {
        "branchName": "Meherpur Sadar",
        "branchCode": "5102"
      },
      {
        "branchName": "Gangni",
        "branchCode": "5101"
      },
      {
        "branchName": "Mujibnagar",
        "branchCode": "5103"
      },
      {
        "branchName": "Meherpur District Office",
        "branchCode": "5100"
      }
    ],
    "NARAIL": [
      {
        "branchName": "Narail Sadar",
        "branchCode": "5203"
      },
      {
        "branchName": "Kalia",
        "branchCode": "5201"
      },
      {
        "branchName": "Lohagara",
        "branchCode": "5202"
      },
      {
        "branchName": "Narail District Office",
        "branchCode": "5200"
      }
    ],
    "KHULNA": [
      {
        "branchName": "Paikgacha",
        "branchCode": "4806"
      },
      {
        "branchName": "Dighalia",
        "branchCode": "4803"
      },
      {
        "branchName": "Terokhada",
        "branchCode": "4809"
      },
      {
        "branchName": "Koira",
        "branchCode": "4805"
      },
      {
        "branchName": "Rupsa",
        "branchCode": "4808"
      },
      {
        "branchName": "Phultala",
        "branchCode": "4807"
      },
      {
        "branchName": "Dumuria",
        "branchCode": "4804"
      },
      {
        "branchName": "Batiaghata",
        "branchCode": "4801"
      },
      {
        "branchName": "Khulna Audit Office",
        "branchCode": "9023"
      },
      {
        "branchName": "Khulna District Office",
        "branchCode": "4800"
      }
    ],
    "BAGERHAT": [
      {
        "branchName": "Chitalmari",
        "branchCode": "4402"
      },
      {
        "branchName": "Fakirhat",
        "branchCode": "4403"
      },
      {
        "branchName": "Rampal",
        "branchCode": "4408"
      },
      {
        "branchName": "Kachua",
        "branchCode": "4404"
      },
      {
        "branchName": "Mollarhat",
        "branchCode": "4405"
      },
      {
        "branchName": "Morelgonj",
        "branchCode": "4407"
      },
      {
        "branchName": "Sarankhola",
        "branchCode": "4409"
      },
      {
        "branchName": "Bagerhat Sadar",
        "branchCode": "4401"
      },
      {
        "branchName": "Bagerhat District Office",
        "branchCode": "4400"
      }
    ]
  }
},
"MYMENSING": {
  districts: {
    "MYMENSINGH": [
      {
        "branchName": "Haluaghat Mymensing",
        "branchCode": "1907"
      },
      {
        "branchName": "Iswarganj",
        "branchCode": "1908"
      },
      {
        "branchName": "Trishal",
        "branchCode": "1912"
      },
      {
        "branchName": "Bhaluka",
        "branchCode": "1901"
      },
      {
        "branchName": "Fulpur Mymensing",
        "branchCode": "1904"
      },
      {
        "branchName": "Nandail",
        "branchCode": "1911"
      },
      {
        "branchName": "Gouripur",
        "branchCode": "1906"
      },
      {
        "branchName": "Goffargaon",
        "branchCode": "1905"
      },
      {
        "branchName": "Fulbaria Mymensing",
        "branchCode": "1903"
      },
      {
        "branchName": "Dhubaura",
        "branchCode": "1902"
      },
      {
        "branchName": "Mymensingh Sadar",
        "branchCode": "1910"
      },
      {
        "branchName": "Muktagacha",
        "branchCode": "1909"
      },
      {
        "branchName": "Tarakanda",
        "branchCode": "1913"
      },
      {
        "branchName": "Mymensingh Audit Office",
        "branchCode": "9011"
      },
      {
        "branchName": "Mymensingh District Office",
        "branchCode": "1900"
      }
    ],
    "SHERPUR": [
      {
        "branchName": "Sherpur Sadar",
        "branchCode": "2504"
      },
      {
        "branchName": "Nalitabari Sherpur",
        "branchCode": "2503"
      },
      {
        "branchName": "Sribordi",
        "branchCode": "2505"
      },
      {
        "branchName": "Nakla Sherpur",
        "branchCode": "2502"
      },
      {
        "branchName": "Jhenaigati Sherpur",
        "branchCode": "2501"
      },
      {
        "branchName": "Sherpur District Office",
        "branchCode": "2500"
      }
    ],
    "JAMALPUR": [
      {
        "branchName": "Islampur",
        "branchCode": "1403"
      },
      {
        "branchName": "Jamalpur Sadar",
        "branchCode": "1404"
      },
      {
        "branchName": "Dewanganj Jamalpur",
        "branchCode": "1402"
      },
      {
        "branchName": "Sharishabari",
        "branchCode": "1407"
      },
      {
        "branchName": "Madarganj Jamalpur",
        "branchCode": "1405"
      },
      {
        "branchName": "Bakshiganj Jamalpur",
        "branchCode": "1401"
      },
      {
        "branchName": "Jamalpur District Office",
        "branchCode": "1400"
      }
    ],
    "NETROKONA": [
      {
        "branchName": "Netrokona Sadar",
        "branchCode": "2108"
      },
      {
        "branchName": "Kalmakanda Netrokona",
        "branchCode": "2103"
      },
      {
        "branchName": "Madan",
        "branchCode": "2106"
      },
      {
        "branchName": "Barhatta Netrokona",
        "branchCode": "2102"
      },
      {
        "branchName": "Atpara",
        "branchCode": "2101"
      },
      {
        "branchName": "Khaliajuri Netrokona",
        "branchCode": "2105"
      },
      {
        "branchName": "Purbadhala Netrokona",
        "branchCode": "2109"
      },
      {
        "branchName": "Kendua Netrokona",
        "branchCode": "2104"
      },
      {
        "branchName": "Durgapur Netrokona",
        "branchCode": "2110"
      },
      {
        "branchName": "Mohanganj Netrokona",
        "branchCode": "2107"
      },
      {
        "branchName": "Netrokona Audit Office",
        "branchCode": "9012"
      },
      {
        "branchName": "Netrokona District Office",
        "branchCode": "2100"
      }
    ]
  }
},
"RAJSHAHI": {
  districts: {
    "RAJSHAHI": [
      {
        "branchName": "Bagmara Rajshahi",
        "branchCode": "6002"
      },
      {
        "branchName": "Paba",
        "branchCode": "6007"
      },
      {
        "branchName": "Durgapur",
        "branchCode": "6004"
      },
      {
        "branchName": "Charghat",
        "branchCode": "6003"
      },
      {
        "branchName": "Mohanpur",
        "branchCode": "6006"
      },
      {
        "branchName": "Bagha",
        "branchCode": "6001"
      },
      {
        "branchName": "Godagari Rajshahi",
        "branchCode": "6005"
      },
      {
        "branchName": "Tanore",
        "branchCode": "6009"
      },
      {
        "branchName": "Putia",
        "branchCode": "6008"
      },
      {
        "branchName": "Rajshahi District Office",
        "branchCode": "6000"
      },
      {
        "branchName": "Rajshahi Audit Office",
        "branchCode": "9014"
      }
    ],
    "NATORE": [
      {
        "branchName": "Singra",
        "branchCode": "5806"
      },
      {
        "branchName": "Gurudaspur",
        "branchCode": "5803"
      },
      {
        "branchName": "Lalpur",
        "branchCode": "5804"
      },
      {
        "branchName": "Baghatipara",
        "branchCode": "5801"
      },
      {
        "branchName": "Noldanga Natore",
        "branchCode": "5807"
      },
      {
        "branchName": "Natore Sadar",
        "branchCode": "5805"
      },
      {
        "branchName": "Baraigram",
        "branchCode": "5802"
      },
      {
        "branchName": "Natore District Office",
        "branchCode": "5800"
      }
    ],
    "CHAPAI NAWABGANJ": [
      {
        "branchName": "Chapainawabganj Sadar",
        "branchCode": "5504"
      },
      {
        "branchName": "Gomastapur",
        "branchCode": "5502"
      },
      {
        "branchName": "Shibganj Chapai",
        "branchCode": "5505"
      },
      {
        "branchName": "Bholahat",
        "branchCode": "5501"
      },
      {
        "branchName": "Nachole CHAPAI NAWABGANJ",
        "branchCode": "5503"
      },
      {
        "branchName": "Chapai Nawabganj District Office",
        "branchCode": "5500"
      }
    ],
    "BOGRA": [
      {
        "branchName": "Dhunot Bogura",
        "branchCode": "5404"
      },
      {
        "branchName": "Sonatola",
        "branchCode": "5412"
      },
      {
        "branchName": "Shajahanpur",
        "branchCode": "5409"
      },
      {
        "branchName": "Sariakandi",
        "branchCode": "5408"
      },
      {
        "branchName": "Bogra Sadar",
        "branchCode": "5402"
      },
      {
        "branchName": "Shibganj",
        "branchCode": "5411"
      },
      {
        "branchName": "Gabtali",
        "branchCode": "5405"
      },
      {
        "branchName": "Kahaloo Bogra",
        "branchCode": "5406"
      },
      {
        "branchName": "Sherpur Bogra",
        "branchCode": "5410"
      },
      {
        "branchName": "Adamdighi",
        "branchCode": "5401"
      },
      {
        "branchName": "Dhubchanchia BOGRA",
        "branchCode": "5403"
      },
      {
        "branchName": "Bogra District Office",
        "branchCode": "5400"
      }
    ],
    "SIRAJGANJ": [
      {
        "branchName": "Ullapara",
        "branchCode": "6109"
      },
      {
        "branchName": "Shahajadpur",
        "branchCode": "6107"
      },
      {
        "branchName": "Belkuchi",
        "branchCode": "6101"
      },
      {
        "branchName": "Tarash",
        "branchCode": "6108"
      },
      {
        "branchName": "Sirajganj Sadar",
        "branchCode": "6106"
      },
      {
        "branchName": "Kazipur",
        "branchCode": "6104"
      },
      {
        "branchName": "Kamarkhanda",
        "branchCode": "6103"
      },
      {
        "branchName": "Raiganj SIRAJGANJ",
        "branchCode": "6105"
      },
      {
        "branchName": "Chowhali SIRAJGANJ",
        "branchCode": "6102"
      },
      {
        "branchName": "Sirajganj District Office",
        "branchCode": "6100"
      },
      {
        "branchName": "Sirajganj Audit Office",
        "branchCode": "9013"
      }
    ],
    "NAOGAON": [
      {
        "branchName": "Niamatpur",
        "branchCode": "5707"
      },
      {
        "branchName": "Badalgachi NAOGAON",
        "branchCode": "5702"
      },
      {
        "branchName": "Shapahar",
        "branchCode": "5711"
      },
      {
        "branchName": "Sonatola",
        "branchCode": "5706"
      },
      {
        "branchName": "Patnitala",
        "branchCode": "5708"
      },
      {
        "branchName": "Naogaon Sadar",
        "branchCode": "5706"
      },
      {
        "branchName": "Manda",
        "branchCode": "5705"
      },
      {
        "branchName": "Porsha",
        "branchCode": "5709"
      },
      {
        "branchName": "Mahadebpur Naogaon",
        "branchCode": "5704"
      },
      {
        "branchName": "Dhamoirhat Naogaon",
        "branchCode": "5703"
      },
      {
        "branchName": "Atrai Naogaon",
        "branchCode": "5701"
      },
      {
        "branchName": "Raninagar",
        "branchCode": "5710"
      },
      {
        "branchName": "Naogaon District Office",
        "branchCode": "5700"
      }
    ],
    "PABNA": [
      {
        "branchName": "Chatmohar",
        "branchCode": "5904"
      },
      {
        "branchName": "Sujanagar",
        "branchCode": "5909"
      },
      {
        "branchName": "Pabna Sadar",
        "branchCode": "5907"
      },
      {
        "branchName": "Santhia",
        "branchCode": "5908"
      },
      {
        "branchName": "Faridpur pabna",
        "branchCode": "5905"
      },
      {
        "branchName": "Bhangura",
        "branchCode": "5903"
      },
      {
        "branchName": "Atgharia",
        "branchCode": "5901"
      },
      {
        "branchName": "Bera",
        "branchCode": "5902"
      },
      {
        "branchName": "Iswardi",
        "branchCode": "5906"
      },
      {
        "branchName": "Pabna District Office",
        "branchCode": "5900"
      }
    ],
    "JOYPURHAT": [
      {
        "branchName": "Panchbibi",
        "branchCode": "5605"
      },
      {
        "branchName": "Akkelpur",
        "branchCode": "5601"
      },
      {
        "branchName": "Kalai",
        "branchCode": "5603"
      },
      {
        "branchName": "Khetlal Joypurhat",
        "branchCode": "5604"
      },
      {
        "branchName": "Joypurhat Sadar",
        "branchCode": "5602"
      },
      {
        "branchName": "Joypurhat District Office",
        "branchCode": "5600"
      }
    ]
  }
},
"RANGPUR": {
  districts: {
    "KURIGRAM": [
      { "branchName": "Rowmari", "branchCode": "6408" },
      { "branchName": "Ulipur", "branchCode": "6409" },
      { "branchName": "Rajibpur KURIGRAM", "branchCode": "6407" },
      { "branchName": "Rajarhat", "branchCode": "6406" },
      { "branchName": "Chilmary", "branchCode": "6402" },
      { "branchName": "Fulbari Kurigram", "branchCode": "6403" },
      { "branchName": "Bhurungamari", "branchCode": "6401" },
      { "branchName": "Nageswari", "branchCode": "6405" },
      { "branchName": "Kurigram Sadar", "branchCode": "6404" },
      { "branchName": "Kurigram District Office", "branchCode": "6400" }
    ],
    "DINAJPUR": [
      { "branchName": "Dinajpur Sadar", "branchCode": "6206" },
      { "branchName": "Chirirbandar", "branchCode": "6205" },
      { "branchName": "Phulbari Dinajpur", "branchCode": "6213" },
      { "branchName": "Birampur", "branchCode": "6201" },
      { "branchName": "Birol", "branchCode": "6203" },
      { "branchName": "Birganj Dinajpur", "branchCode": "6202" },
      { "branchName": "Parbatipur", "branchCode": "6212" },
      { "branchName": "Khanshama", "branchCode": "6210" },
      { "branchName": "Bochaganj", "branchCode": "6204" },
      { "branchName": "Nawabganj", "branchCode": "6211" },
      { "branchName": "Kaharole Dinajpur", "branchCode": "6209" },
      { "branchName": "Hakimpur", "branchCode": "6208" },
      { "branchName": "Ghoraghat", "branchCode": "6207" },
      { "branchName": "Dinajpur District Office", "branchCode": "6200" }
    ],
    "PANCHAGARH": [
      { "branchName": "Panchagarh Sadar", "branchCode": "6704" },
      { "branchName": "Boda", "branchCode": "6702" },
      { "branchName": "Atwari", "branchCode": "6701" },
      { "branchName": "Tetulia", "branchCode": "6705" },
      { "branchName": "Debiganj", "branchCode": "6703" },
      { "branchName": "Panchagarh District Office", "branchCode": "6700" }
    ],
    "THAKURGAON": [
      { "branchName": "Thakurgaon", "branchCode": "6905" },
      { "branchName": "Haripur", "branchCode": "6902" },
      { "branchName": "Ranishankail", "branchCode": "6904" },
      { "branchName": "Baliadangi Thakurgaon", "branchCode": "6901" },
      { "branchName": "Pirganj THAKURGAON", "branchCode": "6903" },
      { "branchName": "Thakurgaon District Office", "branchCode": "6900" },
      { "branchName": "Thakurgaon Audit Office", "branchCode": "9015" }
    ],
    "GAIBANDHA": [
      { "branchName": "Gobindaganj", "branchCode": "6303" },
      { "branchName": "Palashbari Gaibandha", "branchCode": "6304" },
      { "branchName": "Gaibandha Sadar", "branchCode": "6302" },
      { "branchName": "Sadullapur", "branchCode": "6305" },
      { "branchName": "Shaghatta", "branchCode": "6306" },
      { "branchName": "Fulchari GAIBANDHA", "branchCode": "6301" },
      { "branchName": "Sundarganj GAIBANDHA", "branchCode": "6307" },
      { "branchName": "Gaibandha District Office", "branchCode": "6300" }
    ],
    "NILPHAMARI": [
      { "branchName": "Nilphamari Sadar", "branchCode": "6605" },
      { "branchName": "Jaldhaka", "branchCode": "6603" },
      { "branchName": "Domar", "branchCode": "6602" },
      { "branchName": "Saidpur", "branchCode": "6606" },
      { "branchName": "Nilphamari District Office", "branchCode": "6600" },
      { "branchName": "Nilphamari District Office", "branchCode": "6600" }
    ],
    "RANGPUR": [
      { "branchName": "Pirganj Rangpur", "branchCode": "6806" },
      { "branchName": "Gangachara", "branchCode": "6802" },
      { "branchName": "Kaunia", "branchCode": "6803" },
      { "branchName": "Badarganj", "branchCode": "6801" },
      { "branchName": "Rangpur District Office", "branchCode": "6800" }
    ]
  }
},
"SYLHET": {
  districts: {
    "SUNAMGANJ": [
      { "branchName": "Derai SUNAMGANJ", "branchCode": "7203" },
      { "branchName": "Dowarabazar", "branchCode": "7205" },
      { "branchName": "Sunamganj Sadar", "branchCode": "7210" },
      { "branchName": "Jamalganj Sunamganj", "branchCode": "7207" },
      { "branchName": "Chattak", "branchCode": "7202" },
      { "branchName": "Shantigang", "branchCode": "7208" },
      { "branchName": "Taherpur", "branchCode": "7211" },
      { "branchName": "Sulla SUNAMGANJ", "branchCode": "7209" },
      { "branchName": "Dharmapasha Sunamganj", "branchCode": "7204" },
      { "branchName": "Jagannathpur", "branchCode": "7206" },
      { "branchName": "Biswambharpur", "branchCode": "7201" },
      { "branchName": "Sunamganj District Office", "branchCode": "7200" }
    ],
    "HABIGANJ": [
      { "branchName": "Baniachang", "branchCode": "7003" },
      { "branchName": "Madhabpur", "branchCode": "7007" },
      { "branchName": "Habiganj Sadar", "branchCode": "7005" },
      { "branchName": "Chunarughat", "branchCode": "7004" },
      { "branchName": "Lakhai", "branchCode": "7006" },
      { "branchName": "Ajmiriganj", "branchCode": "7001" },
      { "branchName": "Bahubal Habiganj", "branchCode": "7002" },
      { "branchName": "Habiganj Audit Office", "branchCode": "9018" }
    ],
    "MAULAVIBAZAR": [
      { "branchName": "Sreemongal", "branchCode": "7107" },
      { "branchName": "Barlekha", "branchCode": "7101" },
      { "branchName": "Juri", "branchCode": "7102" },
      { "branchName": "Kulaura", "branchCode": "7104" },
      { "branchName": "Kamalganj", "branchCode": "7103" },
      { "branchName": "Moulvibazar Sadar", "branchCode": "7105" },
      { "branchName": "Rajnagar MAULAVIBAZAR", "branchCode": "7106" },
      { "branchName": "Moulvibazar District Office", "branchCode": "7100" }
    ],
    "SYLHET": [
      { "branchName": "Balaganj", "branchCode": "7301" },
      { "branchName": "Golapganj", "branchCode": "7306" },
      { "branchName": "Beanibazar", "branchCode": "7302" },
      { "branchName": "Companyganj Sylhet", "branchCode": "7304" },
      { "branchName": "Sylhet Sadar", "branchCode": "7311" },
      { "branchName": "Biswanath", "branchCode": "7303" },
      { "branchName": "Gowainghat SYLHET", "branchCode": "7307" },
      { "branchName": "Jaintapur", "branchCode": "7308" },
      { "branchName": "Fenchuganj", "branchCode": "7305" },
      { "branchName": "South Surma", "branchCode": "7310" },
      { "branchName": "Zakiganj Sylhet", "branchCode": "7312" },
      { "branchName": "OsmaniNagar", "branchCode": "" },
      { "branchName": "Kanaighat", "branchCode": "7309" },
      { "branchName": "Sylhet District Office", "branchCode": "7300" },
      { "branchName": "Sylhet Audit Office", "branchCode": "9017" },
      { "branchName": "Habiganj District Office", "branchCode": "7000" }
    ]
  }
},

};

export default bangladeshData;
