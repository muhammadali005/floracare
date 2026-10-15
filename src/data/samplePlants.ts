import { PlantCareAnalysis } from '../types/plant';

export interface SamplePlantPreset {
  id: string;
  name: string;
  botanicalName: string;
  badge: string;
  imageUrl: string;
  thumbnailUrl: string;
  description: string;
  notes: string;
  preloadedAnalysis: PlantCareAnalysis;
}

export const SAMPLE_PLANTS: SamplePlantPreset[] = [
  {
    id: 'monstera',
    name: 'Monstera Deliciosa',
    botanicalName: 'Monstera deliciosa Liebm.',
    badge: 'Healthy & Thriving',
    imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1000&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=200&q=80',
    description: 'Iconic split-leaf tropical vine with lush green fenestrations.',
    notes: 'Indoor bright corner, showing vigorous new unfurling leaf.',
    preloadedAnalysis: {
      plantName: 'Monstera Deliciosa (Swiss Cheese Plant)',
      botanicalName: 'Monstera deliciosa',
      family: 'Araceae',
      confidence: 98,
      plantType: 'Tropical Epiphytic Vine',
      origin: 'Tropical rainforests of Southern Mexico & Central America',
      summary: 'A vigorous evergreen vine celebrated for its perforated, heart-shaped glossy foliage. In nature, it climbs massive rainforest trees using robust aerial roots.',
      healthAssessment: {
        status: 'healthy',
        score: 95,
        detectedIssues: [],
        symptomsObserved: 'Deep green foliage with deep natural fenestrations, firm petioles, and active aerial root development. No signs of fungal rust or pest damage.',
        immediateActions: ['Wipe foliage gently with a damp cloth to remove dust and maximize photosynthesis.']
      },
      careInstructions: {
        watering: {
          frequency: 'Every 7 to 10 days in spring/summer, 14 to 20 days in winter',
          method: 'Soak thoroughly until water streams freely from base drainage holes. Allow top 2-3 inches of soil to dry before the next hydration.',
          winterAdjustment: 'Reduce frequency by half; allow soil to dry almost halfway down during low light months.',
          waterType: 'Filtered or room-temperature rainwater. Sensitive to excessive chlorine in hard city water.',
          overwateringSigns: 'Yellowing lower leaves, mushy brown leaf margins, soft dark petioles.',
          underwateringSigns: 'Drooping petioles, crispy dry tips, dull curling leaves.',
          daysInterval: 8
        },
        sunlight: {
          requirement: 'Medium to bright indirect sunlight',
          intensity: 'Bright Indirect',
          idealLocation: 'Within 3 to 6 feet of an East or gently shaded South window.',
          burnSigns: 'Bleached white or crispy scorched brown patches from direct harsh noon rays.',
          lowLightSigns: 'Stretched leggy stems and solid leaves lacking fenestrations (holes).'
        },
        soilAndPotting: {
          soilType: 'Chunky, airy aroid mix: 40% indoor potting soil, 30% perlite or pumice, 30% orchid bark.',
          potDrainage: 'Crucial bottom drainage holes. Unglazed terracotta or nursery pot within decorative planter.',
          phRange: '5.5 - 7.0 (slightly acidic)',
          repottingFrequency: 'Every 1 to 2 years in early spring into a container 2-3 inches wider.'
        },
        climate: {
          temperatureRange: '65°F - 85°F (18°C - 29°C)',
          minTemperature: '55°F (13°C) absolute minimum',
          humidityTarget: '60% - 80% (tolerates typical 40-50% indoor room humidity)',
          humidityTips: 'Pair with nearby foliage plants, employ a pebble tray with water, or place near a cool-mist humidifier.'
        },
        fertilizer: {
          frequency: 'Every 3 to 4 weeks during active growth (April to September)',
          type: 'Balanced liquid fertilizer (NPK 20-20-20) diluted to half recommended strength.',
          dormancyRule: 'Zero fertilizer from late October through February.'
        },
        pruningAndPropagation: {
          pruningTips: 'Prune away older bottom leaves that naturally senesce to channel energy toward new apical shoots.',
          propagationMethod: 'Stem cutting below an aerial root node rooted in clean water or moist sphagnum.',
          growthHabit: 'Climbing hemi-epiphyte; introduce a sturdy coco coir or sphagnum moss pole for larger leaves.'
        },
        safetyAndToxicity: {
          isToxicToPets: true,
          petWarning: 'Contains insoluble calcium oxalate crystals. Mild to moderately toxic to dogs and cats; causes mouth irritation, drooling, and difficulty swallowing if ingested.',
          humanToxicity: 'Foliage is mildly toxic if ingested. Keep away from curious toddlers and pets.'
        }
      },
      botanicalFacts: [
        'The name "deliciosa" refers to its edible wild fruit, which tastes like a blend of banana, pineapple, and mango when fully ripe!',
        'The holes in the leaves (fenestrations) evolved to let hurricane-force jungle winds and rain pass through without tearing the giant leaves.',
        'Aerial roots absorb moisture directly from humid air and can be tucked back into the pot soil to deliver nutrients.'
      ],
      suggestedQuestions: [
        'How do I train my Monstera onto a moss pole for massive leaves?',
        'Why are my new Monstera leaves coming out without splits or holes?',
        'Can I prune long aerial roots without harming the plant?'
      ]
    }
  },
  {
    id: 'fiddle-leaf-fig',
    name: 'Fiddle Leaf Fig',
    botanicalName: 'Ficus lyrata',
    badge: 'Needs Attention (Dry Tips)',
    imageUrl: 'https://images.unsplash.com/photo-1597055181300-e3633a917c9c?auto=format&fit=crop&w=1000&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1597055181300-e3633a917c9c?auto=format&fit=crop&w=200&q=80',
    description: 'Dramatic architectural violin-shaped leaves showing mild dryness.',
    notes: 'Leaves show subtle brown crispy edges; recently moved near an AC vent.',
    preloadedAnalysis: {
      plantName: 'Fiddle Leaf Fig',
      botanicalName: 'Ficus lyrata Warb.',
      family: 'Moraceae (Fig family)',
      confidence: 96,
      plantType: 'Indoor Architectural Tree / Evergreen',
      origin: 'Lowland tropical rainforests of Western Africa (Cameroon to Sierra Leone)',
      summary: 'A showstopping indoor statement tree with massive lyre-shaped leaves. Famous for its structural grandeur and sensitivity to sudden drafts and erratic hydration.',
      healthAssessment: {
        status: 'needs_attention',
        score: 74,
        detectedIssues: ['Localized edge browning (air conditioning draft stress)', 'Slight moisture inconsistency'],
        symptomsObserved: 'Lower and middle foliage show crisping at outer margins consistent with low humidity and air vent exposure. Central apical bud remains green.',
        immediateActions: [
          'Relocate immediately at least 6 feet away from direct air conditioning or heater vents.',
          'Provide a thorough deep soak and check that water drains freely without pooling in the tray.'
        ]
      },
      careInstructions: {
        watering: {
          frequency: 'Every 7 to 10 days, letting top 2 inches dry out completely',
          method: 'Water slowly and thoroughly around the root ball until water flows out the drainage holes, then discard excess water.',
          winterAdjustment: 'Reduce to every 12 to 14 days when light levels and evaporation decline.',
          waterType: 'Lukewarm room-temperature water. Avoid shock from cold tap water.',
          overwateringSigns: 'Brown spots spreading from center veins outward, dropping lower leaves while still soft.',
          underwateringSigns: 'Crispy brown leaf edges starting at tips, curling, dull droopiness.',
          daysInterval: 9
        },
        sunlight: {
          requirement: 'Consistent bright, filtered indirect light with gentle morning sun',
          intensity: 'Bright Indirect',
          idealLocation: 'Right next to a large unobstructed South or East window.',
          burnSigns: 'Light bleached patches on top leaves.',
          lowLightSigns: 'Leaf drop, dull foliage, and lack of new leaf production.'
        },
        soilAndPotting: {
          soilType: 'Fast-draining, rich peat-based potting soil amended with perlite and pine bark chips.',
          potDrainage: 'High-flow bottom drainage is mandatory to prevent fatal root rot.',
          phRange: '6.0 - 7.0 (neutral to slightly acidic)',
          repottingFrequency: 'Every 2 years in spring, or top-dress with fresh compost/soil annually.'
        },
        climate: {
          temperatureRange: '65°F - 80°F (18°C - 27°C)',
          minTemperature: '60°F (15°C); highly vulnerable to sudden thermal drops',
          humidityTarget: '50% - 65% humidity',
          humidityTips: 'Mist occasionally, clean leaves monthly with water to remove dust, and shield from drafts.'
        },
        fertilizer: {
          frequency: 'Once every 3 to 4 weeks during spring and summer',
          type: 'Specialized 3-1-2 NPK foliage fertilizer or balanced houseplant formula.',
          dormancyRule: 'Cease fertilizing during autumn and winter.'
        },
        pruningAndPropagation: {
          pruningTips: 'Pinch top growth tip ("notching") in spring to encourage desirable branching into a bushy tree shape.',
          propagationMethod: 'Stem cuttings or air-layering in warm, humid conditions.',
          growthHabit: 'Upright woody tree reaching up to 10 feet indoors.'
        },
        safetyAndToxicity: {
          isToxicToPets: true,
          petWarning: 'Contains milky latex sap with irritating furocoumarins. Causes stomach upset and oral irritation in cats and dogs.',
          humanToxicity: 'Sap can cause mild contact skin dermatitis; wear gardening gloves when pruning.'
        }
      },
      botanicalFacts: [
        'In the wild, Ficus lyrata often starts life as an epiphyte high up in the tree crown before sending roots down to the forest floor!',
        'Wiping the leaves with a microfiber cloth boosts photosynthesis efficiency by up to 25% by removing indoor dust layers.',
        'They dislike being moved—rotating 90 degrees once a month keeps symmetrical growth without causing shock leaf drops.'
      ],
      suggestedQuestions: [
        'How do I stop my Fiddle Leaf Fig from dropping lower leaves?',
        'How do I encourage my Fiddle Leaf Fig to branch out into a tree?',
        'What causes small red or brown dots (edema) on new fiddle leaves?'
      ]
    }
  },
  {
    id: 'snake-plant',
    name: 'Snake Plant (Sansevieria)',
    botanicalName: 'Dracaena trifasciata',
    badge: 'Hardy & Resilient',
    imageUrl: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=1000&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=200&q=80',
    description: 'Striking upright sword-like variegated leaves, the ultimate clean-air plant.',
    notes: 'Office desktop plant, extremely low maintenance.',
    preloadedAnalysis: {
      plantName: 'Snake Plant / Mother-in-Law’s Tongue',
      botanicalName: 'Dracaena trifasciata (syn. Sansevieria)',
      family: 'Asparagaceae',
      confidence: 99,
      plantType: 'Succulent / Rhizomatous Perennial',
      origin: 'Arid tropical West Africa (Nigeria to the Congo)',
      summary: 'One of the most indestructible, air-purifying houseplants on earth. Possesses architectural upright sword foliage with distinctive yellow margins and silvery-green bands.',
      healthAssessment: {
        status: 'healthy',
        score: 98,
        detectedIssues: [],
        symptomsObserved: 'Firm, turgid upright blades with vivid cross-banded patterns. No base softening or yellow wrinkling.',
        immediateActions: ['Continue current low-frequency watering regimen; allow complete soil dry-out.']
      },
      careInstructions: {
        watering: {
          frequency: 'Every 2 to 4 weeks (less is more)',
          method: 'Bottom water or water around the soil perimeter. Avoid pouring water directly into the center leaf rosette.',
          winterAdjustment: 'Water only once every 5 to 7 weeks in winter; overwatering is the #1 killer.',
          waterType: 'Standard tap water is fine; highly drought-tolerant succulent nature.',
          overwateringSigns: 'Soggy, mushy yellow leaves collapsing at the soil line, foul rot smell.',
          underwateringSigns: 'Wrinkled leaf epidermis, slight inward curling, brittle leaf tips.',
          daysInterval: 21
        },
        sunlight: {
          requirement: 'Adaptable to almost all light levels: from low office light to direct morning sunlight',
          intensity: 'Medium',
          idealLocation: 'Anywhere from shaded bedroom corners to bright sunny window ledges.',
          burnSigns: 'White bleached or dry crispy brown spots if abruptly moved into blazing desert sun.',
          lowLightSigns: 'Variegation may turn darker green and growth slows down (still remains healthy).'
        },
        soilAndPotting: {
          soilType: 'Gritty cactus & succulent soil mix with coarse sand, pumice, and perlite.',
          potDrainage: 'Sturdy terracotta pot with large drainage hole to promote rapid drying.',
          phRange: '5.5 - 7.5 (wide tolerance)',
          repottingFrequency: 'Only every 3 to 5 years; thrives and often produces offshoots ("pups") when root-bound.'
        },
        climate: {
          temperatureRange: '60°F - 85°F (15°C - 30°C)',
          minTemperature: '50°F (10°C); keep completely dry if temperatures fall below 55°F',
          humidityTarget: '30% - 50% (handles dry indoor radiator air with ease)',
          humidityTips: 'Does not require misting or supplemental humidity.'
        },
        fertilizer: {
          frequency: 'Twice a year (once in spring, once in midsummer)',
          type: 'Half-strength succulent or all-purpose houseplant feed.',
          dormancyRule: 'Zero fertilization during fall and winter.'
        },
        pruningAndPropagation: {
          pruningTips: 'Remove damaged or old outer leaves by slicing cleanly near soil level with a sanitized razor blade.',
          propagationMethod: 'Division of underground rhizomes (easiest) or leaf blade cuttings in soil.',
          growthHabit: 'Slow-growing, erect rosette producing rhizomatous lateral offsets.'
        },
        safetyAndToxicity: {
          isToxicToPets: true,
          petWarning: 'Contains saponins which can cause gastrointestinal upset, vomiting, and diarrhea in dogs and cats.',
          humanToxicity: 'Low toxicity; causes mild salivation or nausea if chewed.'
        }
      },
      botanicalFacts: [
        'NASA Clean Air Study discovered Snake Plants remove benzene, formaldehyde, trichloroethylene, and xylene from indoor air.',
        'Unlike most plants that release CO2 at night, snake plants use Crassulacean Acid Metabolism (CAM) to release pure Oxygen at night, making them ideal bedroom companions!',
        'In traditional African culture, snake plants were used as protective botanical wards against negative energy and bad luck.'
      ],
      suggestedQuestions: [
        'How do I separate snake plant pups into new pots?',
        'Can a snake plant survive in a room with no windows?',
        'What should I do if a snake plant leaf gets bent or floppy?'
      ]
    }
  },
  {
    id: 'peace-lily',
    name: 'Peace Lily',
    botanicalName: 'Spathiphyllum wallisii',
    badge: 'Expressive Drama Queen',
    imageUrl: 'https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&w=1000&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&w=200&q=80',
    description: 'Lush glossy emerald foliage with elegant white spathes, tells you when thirsty.',
    notes: 'Indoor living room table, blooms several times a year.',
    preloadedAnalysis: {
      plantName: 'Peace Lily',
      botanicalName: 'Spathiphyllum wallisii Regel',
      family: 'Araceae',
      confidence: 97,
      plantType: 'Herbaceous Perennial / Indoor Flowering Plant',
      origin: 'Rainforest understory of Central and South America',
      summary: 'Famous for its dramatic, expressive leaves that dramatically droop when thirsty and perk right back up within hours of a drink. Produces long-lasting creamy-white hooded spathes.',
      healthAssessment: {
        status: 'healthy',
        score: 91,
        detectedIssues: ['Minor fluoride tip sensitivity'],
        symptomsObserved: 'Leaves show high turgor and glossy luster. Tiny 1mm brown tips on oldest leaves indicate sensitivity to chlorinated tap water.',
        immediateActions: ['Use filtered, distilled, or rainwater to eliminate brown leaf tips caused by fluoride.']
      },
      careInstructions: {
        watering: {
          frequency: 'Every 5 to 7 days, whenever top 1 inch of soil begins to dry',
          method: 'Soak evenly until water drains through; wait for the first subtle hint of leaf relaxation before watering.',
          winterAdjustment: 'Reduce frequency slightly as evaporation slows.',
          waterType: 'Filtered, distilled, or dechlorinated water. Highly sensitive to fluoride and municipal salts.',
          overwateringSigns: 'Yellowing leaves across the plant, black tips with a wet yellow halo, soggy soil.',
          underwateringSigns: 'Dramatic full-body droop (temporary wilting), dry crispy brown tips.',
          daysInterval: 6
        },
        sunlight: {
          requirement: 'Low to medium indirect light; avoid direct sunlight',
          intensity: 'Low',
          idealLocation: 'North-facing window or several feet back from East or West windows.',
          burnSigns: 'Scorched white/brown crispy spots and pale bleached foliage.',
          lowLightSigns: 'Fewer or no white flower spathes produced.'
        },
        soilAndPotting: {
          soilType: 'Moisture-retentive yet well-draining soil mix containing peat moss, perlite, and fine bark.',
          potDrainage: 'Must have drainage; does not tolerate perpetually soggy mud.',
          phRange: '5.6 - 6.5',
          repottingFrequency: 'Every 1 to 2 years in spring when roots begin crowding the container.'
        },
        climate: {
          temperatureRange: '65°F - 80°F (18°C - 27°C)',
          minTemperature: '55°F (13°C); sensitive to cold windows and drafts',
          humidityTarget: '50% - 70% humidity',
          humidityTips: 'Loves high bathroom humidity or regular fine misting.'
        },
        fertilizer: {
          frequency: 'Every 6 weeks during spring and summer at 1/4 strength',
          type: 'Foliage and blooming balanced liquid fertilizer.',
          dormancyRule: 'No fertilizer needed during winter.'
        },
        pruningAndPropagation: {
          pruningTips: 'Trim spent green flower stalks at the very base to redirect energy into fresh blooms.',
          propagationMethod: 'Division of crown clumps during spring repotting.',
          growthHabit: 'Dense clumping habit with arching glossy foliage.'
        },
        safetyAndToxicity: {
          isToxicToPets: true,
          petWarning: 'Contains calcium oxalate crystals. Toxic to dogs and cats, causing intense oral discomfort and drooling. (Note: Not a true lily, so not fatal to cat kidneys like Lilium species).',
          humanToxicity: 'Causes irritation if ingested; keep away from small children.'
        }
      },
      botanicalFacts: [
        'The white "flower" is actually a specialized leaf called a spathe! The real flowers are the tiny bumps on the central spike (spadix).',
        'Peace lilies are famous "communicators"—they will dramatically wilt as a distress signal, earning their nickname as houseplant drama queens.',
        'They excel at removing airborne toxins including ammonia, benzene, and trichloroethylene according to NASA research.'
      ],
      suggestedQuestions: [
        'Why won’t my Peace Lily bloom any white flowers?',
        'How can I get rid of the brown tips on my Peace Lily leaves?',
        'How soon will my drooping Peace Lily bounce back after watering?'
      ]
    }
  }
];
