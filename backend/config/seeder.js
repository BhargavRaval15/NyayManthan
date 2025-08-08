console.log("🔍 Seeder script starting...");

const mongoose = require("mongoose");
const Article = require("../models/Article");
require("dotenv").config();

console.log("📦 Dependencies loaded successfully");

const sampleArticles = [
  // Part III - Fundamental Rights (Enhanced)
  {
    articleNumber: "12",
    title: "Definition",
    part: "III",
    partName: "Fundamental Rights",
    originalText:
      'In this Part, unless the context otherwise requires, "the State" includes the Government and Parliament of India and the Government and the Legislature of each of the States and all local or other authorities within the territory of India or under the control of the Government of India.',
    tags: ["definition", "state", "government", "parliament", "legislature"],
  },
  {
    articleNumber: "13",
    title: "Laws inconsistent with or in derogation of the fundamental rights",
    part: "III",
    partName: "Fundamental Rights",
    originalText:
      '(1) All laws in force in the territory of India immediately before the commencement of this Constitution, in so far as they are inconsistent with the provisions of this Part, shall, to the extent of such inconsistency, be void. (2) The State shall not make any law which takes away or abridges the rights conferred by this Part and any law made in contravention of this clause shall, to the extent of the contravention, be void. (3) In this article, unless the context otherwise requires, "law" includes any Ordinance, order, bye-law, rule, regulation, notification, custom or usage having in the territory of India the force of law; "laws in force" includes laws passed or made by a Legislature or other competent authority in the territory of India before the commencement of this Constitution and not previously repealed, notwithstanding that any such law or any part thereof may not be then in operation either wholly or in part or in any particular area. (4) Nothing in this article shall apply to any amendment of this Constitution made under article 368.',
    tags: ["laws", "fundamental rights", "void", "amendment", "constitution"],
  },
  {
    articleNumber: "14",
    title: "Equality before law",
    part: "III",
    partName: "Fundamental Rights",
    originalText:
      "The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.",
    tags: ["equality", "law", "equal protection", "discrimination"],
  },
  {
    articleNumber: "15",
    title:
      "Prohibition of discrimination on grounds of religion, race, caste, sex or place of birth",
    part: "III",
    partName: "Fundamental Rights",
    originalText:
      "(1) The State shall not discriminate against any citizen on grounds only of religion, race, caste, sex, place of birth or any of them. (2) No citizen shall, on grounds only of religion, race, caste, sex, place of birth or any of them, be subject to any disability, liability, restriction or condition with regard to— (a) access to shops, public restaurants, hotels and places of public entertainment; or (b) the use of wells, tanks, bathing ghats, roads and places of public resort maintained wholly or partly out of State funds or dedicated to the use of the general public. (3) Nothing in this article shall prevent the State from making any special provision for women and children. (4) Nothing in this article or in clause (2) of article 29 shall prevent the State from making any special provision for the advancement of any socially and educationally backward classes of citizens or for the Scheduled Castes and the Scheduled Tribes.",
    tags: [
      "discrimination",
      "religion",
      "race",
      "caste",
      "sex",
      "equality",
      "special provision",
    ],
  },
  {
    articleNumber: "16",
    title: "Equality of opportunity in matters of public employment",
    part: "III",
    partName: "Fundamental Rights",
    originalText:
      "(1) There shall be equality of opportunity for all citizens in matters relating to employment or appointment to any office under the State. (2) No citizen shall, on grounds only of religion, race, caste, sex, descent, place of birth, residence or any of them, be ineligible for, or discriminated against in respect of, any employment or office under the State. (3) Nothing in this article shall prevent Parliament from making any law prescribing, in regard to a class or classes of employment or appointment to an office under the State, any requirement as to residence within a State or Union territory prior to such employment or appointment. (4) Nothing in this article shall prevent the State from making any provision for the reservation of appointments or posts in favour of any backward class of citizens which, in the opinion of the State, is not adequately represented in the services under the State.",
    tags: [
      "employment",
      "public service",
      "reservation",
      "equality",
      "opportunity",
    ],
  },
  {
    articleNumber: "17",
    title: "Abolition of Untouchability",
    part: "III",
    partName: "Fundamental Rights",
    originalText:
      '"Untouchability" is abolished and its practice in any form is forbidden. The enforcement of any disability arising out of "Untouchability" shall be an offence punishable in accordance with law.',
    tags: [
      "untouchability",
      "abolition",
      "disability",
      "punishment",
      "social justice",
    ],
  },
  {
    articleNumber: "18",
    title: "Abolition of titles",
    part: "III",
    partName: "Fundamental Rights",
    originalText:
      "(1) No title, not being a military or academic distinction, shall be conferred by the State. (2) No citizen of India shall accept any title from any foreign State. (3) No person who is not a citizen of India shall, while he holds any office of profit or trust under the State, accept without the consent of the President any title from any foreign State. (4) No person holding any office of profit or trust under the State shall, without the consent of the President, accept any present, emolument, or office of any kind from or under any foreign State.",
    tags: ["titles", "academic", "military", "foreign state", "president"],
  },
  {
    articleNumber: "19",
    title: "Protection of certain rights regarding freedom of speech, etc.",
    part: "III",
    partName: "Fundamental Rights",
    originalText:
      "(1) All citizens shall have the right to— (a) freedom of speech and expression; (b) to assemble peaceably and without arms; (c) to form associations or unions; (d) to move freely throughout the territory of India; (e) to reside and settle in any part of the territory of India; and (f) to practise any profession, or to carry on any occupation, trade or business. (2) Nothing in sub-clause (a) of clause (1) shall affect the operation of any existing law, or prevent the State from making any law, in so far as such law imposes reasonable restrictions on the exercise of the right conferred by the said sub-clause in the interests of the sovereignty and integrity of India, the security of the State, friendly relations with foreign States, public order, decency or morality or in relation to contempt of court, defamation or incitement to an offence.",
    tags: [
      "freedom of speech",
      "expression",
      "assembly",
      "association",
      "movement",
      "profession",
      "reasonable restrictions",
    ],
  },
  {
    articleNumber: "20",
    title: "Protection in respect of conviction for offences",
    part: "III",
    partName: "Fundamental Rights",
    originalText:
      "(1) No person shall be convicted of any offence except for violation of a law in force at the time of the commission of the act charged as an offence, nor be subjected to a penalty greater than that which might have been inflicted under the law in force at the time of the commission of the offence. (2) No person shall be prosecuted and punished for the same offence more than once. (3) No person accused of any offence shall be compelled to be a witness against himself.",
    tags: [
      "conviction",
      "ex-post-facto",
      "double jeopardy",
      "self-incrimination",
      "criminal law",
    ],
  },
  {
    articleNumber: "21",
    title: "Protection of life and personal liberty",
    part: "III",
    partName: "Fundamental Rights",
    originalText:
      "No person shall be deprived of his life or personal liberty except according to procedure established by law.",
    tags: ["life", "personal liberty", "due process", "procedure"],
  },
  {
    articleNumber: "21A",
    title: "Right to education",
    part: "III",
    partName: "Fundamental Rights",
    originalText:
      "The State shall provide free and compulsory education to all children of the age of six to fourteen years in such manner as the State may, by law, determine.",
    tags: [
      "education",
      "children",
      "free education",
      "compulsory education",
      "six to fourteen",
    ],
  },
  {
    articleNumber: "22",
    title: "Protection against arrest and detention in certain cases",
    part: "III",
    partName: "Fundamental Rights",
    originalText:
      "(1) No person who is arrested shall be detained in custody without being informed, as soon as may be, of the grounds for such arrest nor shall he be denied the right to consult, and to be defended by, a legal practitioner of his choice. (2) Every person who is arrested and detained in custody shall be produced before the nearest magistrate within a period of twenty-four hours of such arrest excluding the time necessary for the journey from the place of arrest to the court of the magistrate and no such person shall be detained in custody beyond the said period without the authority of a magistrate.",
    tags: [
      "arrest",
      "detention",
      "legal practitioner",
      "magistrate",
      "custody",
    ],
  },
  {
    articleNumber: "23",
    title: "Prohibition of traffic in human beings and forced labour",
    part: "III",
    partName: "Fundamental Rights",
    originalText:
      "(1) Traffic in human beings and begar and other similar forms of forced labour are prohibited and any contravention of this provision shall be an offence punishable in accordance with law. (2) Nothing in this article shall prevent the State from imposing compulsory service for public purposes, and in imposing such service the State shall not make any discrimination on grounds only of religion, race, caste or class or any of them.",
    tags: [
      "human trafficking",
      "forced labour",
      "begar",
      "compulsory service",
      "public purpose",
    ],
  },
  {
    articleNumber: "24",
    title: "Prohibition of employment of children in factories, etc.",
    part: "III",
    partName: "Fundamental Rights",
    originalText:
      "No child below the age of fourteen years shall be employed to work in any factory or mine or engaged in any other hazardous employment.",
    tags: [
      "child labour",
      "factory",
      "mine",
      "hazardous employment",
      "fourteen years",
    ],
  },
  {
    articleNumber: "25",
    title:
      "Freedom of conscience and free profession, practice and propagation of religion",
    part: "III",
    partName: "Fundamental Rights",
    originalText:
      "(1) Subject to public order, morality and health and to the other provisions of this Part, all persons are equally entitled to freedom of conscience and the right freely to profess, practise and propagate religion. (2) Nothing in this article shall affect the operation of any existing law or prevent the State from making any law— (a) regulating or restricting any economic, financial, political or other secular activity which may be associated with religious practice; (b) providing for social welfare and reform or the throwing open of Hindu religious institutions of a public character to all classes and sections of Hindus.",
    tags: [
      "freedom of religion",
      "conscience",
      "profess",
      "practice",
      "propagate",
      "public order",
    ],
  },
  {
    articleNumber: "26",
    title: "Freedom to manage religious affairs",
    part: "III",
    partName: "Fundamental Rights",
    originalText:
      "Subject to public order, morality and health, every religious denomination or any section thereof shall have the right— (a) to establish and maintain institutions for religious and charitable purposes; (b) to manage its own affairs in matters of religion; (c) to own and acquire movable and immovable property; and (d) to administer such property in accordance with law.",
    tags: [
      "religious denomination",
      "institutions",
      "charitable",
      "property",
      "administration",
    ],
  },
  {
    articleNumber: "27",
    title:
      "Freedom as to payment of taxes for promotion of any particular religion",
    part: "III",
    partName: "Fundamental Rights",
    originalText:
      "No person shall be compelled to pay any taxes, the proceeds of which are specifically appropriated in payment of expenses for the promotion or maintenance of any particular religion or religious denomination.",
    tags: ["taxes", "religion", "promotion", "maintenance", "compulsion"],
  },
  {
    articleNumber: "28",
    title:
      "Freedom as to attendance at religious instruction or religious worship in certain educational institutions",
    part: "III",
    partName: "Fundamental Rights",
    originalText:
      "(1) No religious instruction shall be provided in any educational institution wholly maintained out of State funds. (2) Nothing in clause (1) shall apply to an educational institution which is administered by the State but has been established under any endowment or trust which requires that religious instruction shall be imparted in such institution. (3) No person attending any educational institution recognised by the State or receiving aid out of State funds shall be required to take part in any religious instruction that may be imparted in such institution or to attend any religious worship that may be conducted in such institution or in any premises attached thereto unless such person or, if such person is a minor, his guardian has given his consent thereto.",
    tags: [
      "religious instruction",
      "educational institutions",
      "state funds",
      "consent",
      "worship",
    ],
  },

  // Part IV - Directive Principles
  {
    articleNumber: "36",
    title: "Definition",
    part: "IV",
    partName: "Directive Principles of State Policy",
    originalText:
      'In this Part, unless the context otherwise requires, "the State" has the same meaning as in Part III.',
    tags: ["definition", "state", "directive principles"],
  },
  {
    articleNumber: "37",
    title: "Application of the principles contained in this Part",
    part: "IV",
    partName: "Directive Principles of State Policy",
    originalText:
      "The provisions contained in this Part shall not be enforceable by any court, but the principles therein laid down are nevertheless fundamental in the governance of the country and it shall be the duty of the State to apply these principles in making laws.",
    tags: ["non-enforceable", "fundamental", "governance", "duty", "state"],
  },
  {
    articleNumber: "38",
    title:
      "State to secure a social order for the promotion of welfare of the people",
    part: "IV",
    partName: "Directive Principles of State Policy",
    originalText:
      "(1) The State shall strive to promote the welfare of the people by securing and protecting as effectively as it may a social order in which justice, social, economic and political, shall inform all the institutions of life. (2) The State shall, in particular, strive to minimise the inequalities in income, and endeavour to eliminate inequalities in status, facilities and opportunities, not only amongst individuals but also amongst groups of people residing in different areas or engaged in different vocations.",
    tags: [
      "social order",
      "welfare",
      "justice",
      "inequalities",
      "opportunities",
    ],
  },
  {
    articleNumber: "39",
    title: "Certain principles of policy to be followed by the State",
    part: "IV",
    partName: "Directive Principles of State Policy",
    originalText:
      "The State shall, in particular, direct its policy towards securing— (a) that the citizens, men and women equally, have the right to an adequate means of livelihood; (b) that the ownership and control of the material resources of the community are so distributed as best to subserve the common good; (c) that the operation of the economic system does not result in the concentration of wealth and means of production to the common detriment; (d) that there is equal pay for equal work for both men and women; (e) that the health and strength of workers, men and women, and the tender age of children are not abused and that citizens are not forced by economic necessity to enter avocations unsuited to their age or strength; (f) that children are given opportunities and facilities to develop in a healthy manner and in conditions of freedom and dignity and that childhood and youth are protected against exploitation and against moral and material abandonment.",
    tags: [
      "livelihood",
      "material resources",
      "economic system",
      "equal pay",
      "children",
      "workers",
    ],
  },
  {
    articleNumber: "44",
    title: "Uniform civil code for the citizens",
    part: "IV",
    partName: "Directive Principles of State Policy",
    originalText:
      "The State shall endeavour to secure for the citizens a uniform civil code throughout the territory of India.",
    tags: ["uniform civil code", "citizens", "territory"],
  },
  {
    articleNumber: "45",
    title:
      "Provision for early childhood care and education to children below the age of six years",
    part: "IV",
    partName: "Directive Principles of State Policy",
    originalText:
      "The State shall endeavour to provide early childhood care and education for all children until they complete the age of six years.",
    tags: ["early childhood", "education", "children", "six years"],
  },

  // Part IV-A - Fundamental Duties
  {
    articleNumber: "51A",
    title: "Fundamental duties",
    part: "IV-A",
    partName: "Fundamental Duties",
    originalText:
      "It shall be the duty of every citizen of India— (a) to abide by the Constitution and respect its ideals and institutions, the National Flag and the National Anthem; (b) to cherish and follow the noble ideals which inspired our national struggle for freedom; (c) to uphold and protect the sovereignty, unity and integrity of India; (d) to defend the country and render national service when called upon to do so; (e) to promote harmony and the spirit of common brotherhood amongst all the people of India transcending religious, linguistic and regional or sectional diversities; to renounce practices derogatory to the dignity of women; (f) to value and preserve the rich heritage of our composite culture; (g) to protect and improve the natural environment including forests, lakes, rivers and wild life, and to have compassion for living creatures; (h) to develop the scientific temper, humanism and the spirit of inquiry and reform; (i) to safeguard public property and to abjure violence; (j) to strive towards excellence in all spheres of individual and collective activity so that the nation constantly rises to higher levels of endeavour and achievement; (k) who is a parent or guardian to provide opportunities for education to his child or, as the case may be, ward between the age of six and fourteen years.",
    tags: [
      "fundamental duties",
      "constitution",
      "national flag",
      "national anthem",
      "sovereignty",
      "unity",
      "integrity",
      "environment",
      "education",
      "excellence",
    ],
  },
];

async function seedDatabase() {
  try {
    console.log("🚀 Starting database seeding process...");

    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/nyaymanthan",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("✅ Connected to MongoDB successfully!");

    // Clear existing articles
    await Article.deleteMany({});
    console.log("Cleared existing articles");

    // Insert sample articles
    const insertedArticles = await Article.insertMany(sampleArticles);
    console.log(`Inserted ${insertedArticles.length} articles`);

    // Create text indexes for better search
    await Article.collection.createIndex({
      title: "text",
      originalText: "text",
      tags: "text",
    });
    console.log("Created text indexes");

    console.log("Database seeded successfully!");

    // Display summary
    const partCounts = await Article.aggregate([
      { $group: { _id: "$part", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    console.log("\nArticles by Part:");
    partCounts.forEach((part) => {
      console.log(`Part ${part._id}: ${part.count} articles`);
    });
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

// Run the seeder
console.log("🌱 Script starting...");
console.log("require.main:", require.main);
console.log("module:", module);
console.log("require.main === module:", require.main === module);

if (require.main === module) {
  console.log("🌱 Executing seeder...");
  seedDatabase();
} else {
  console.log("📦 Seeder loaded as module");
}

module.exports = { seedDatabase, sampleArticles };
