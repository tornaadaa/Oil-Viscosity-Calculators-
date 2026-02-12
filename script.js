document.addEventListener('DOMContentLoaded', () => {
    // ===== THEME TOGGLE =====
    const themeToggle = document.getElementById('themeToggle');
    let currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', currentTheme);
            localStorage.setItem('theme', currentTheme);
        });
    }

    // ===== STAR PARTICLE GENERATOR (Space Theme) =====
    function createStars() {
        const container = document.querySelector('.stars-container');
        if (!container) return;

        container.innerHTML = '';
        const starCount = window.innerWidth < 768 ? 30 : 50;

        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.setProperty('--duration', `${2 + Math.random() * 3}s`);
            star.style.animationDelay = `${Math.random() * 3}s`;
            star.style.width = star.style.height = `${1 + Math.random() * 2}px`;
            container.appendChild(star);
        }
    }
    createStars();
    window.addEventListener('resize', createStars);

    // ===== TRANSLATIONS =====
    const translations = {
        en: {
            appTitle: "Oil Viscosity Calculators",
            appSubtitle: "PVT Properties - Multiple Correlations",
            lbcSubtitle: "Lohrenz-Bray-Clark Correlation",
            lbcBackground: "The Lohrenz-Bray-Clark (LBC) correlation was developed in 1964 by John Lohrenz, Bruce G. Bray, and Charles R. Clark at Standard Oil Company of California (now Chevron). This correlation was presented in their landmark paper in the Journal of Petroleum Technology and has since become one of the most widely used methods for estimating reservoir fluid viscosity in the petroleum industry.",
            lbcHowItWorks: "The LBC correlation uses a modified corresponding states principle combined with dimensionless density to predict viscosity. The method relates viscosity to the reduced density and molecular weight of the fluid mixture. It performs particularly well for gas condensate and volatile oil systems at reservoir conditions.",
            lbcFormulaIntro: "The LBC correlation is expressed as:",
            mixtureViscosity: "mixture viscosity (cP)",
            atmosphericViscosity: "atmospheric viscosity (cP)",
            reducedDensity: "reduced density (dimensionless)",
            viscosityParameter: "viscosity parameter related to molecular weight and critical properties",
            calculateBtn: "Calculate",
            resetBtn: "Reset",
            resultLabel: "Result:",
            footerText: "Oil Viscosity Calculators - Thermodynamics Course",
            lkBackground: "The Little-Kennedy correlation was developed in 1968 by J.E. Little and H.T. Kennedy Jr. at the University of Oklahoma. Their research focused on creating a more accurate method for predicting heavy oil viscosities, particularly for oils with high molecular weights and specific gravities found in many North American reservoirs.",
            lkHowItWorks: "This correlation uses a complex polynomial approach with temperature and pressure correction factors. It employs two sets of coefficients (A and B) that account for the compositional complexity of crude oils. The method is particularly effective for heavy crude oils and incorporates the effect of the C7+ fraction molecular weight and specific gravity.",
            formulaWhere: "Where:",
            oilViscosity: "oil viscosity (cP)",
            temperature: "temperature",
            pressure: "pressure",
            empiricalCoeffs: "empirical coefficients",
            molWeightC7: "molecular weight of C7+ fraction",
            specGravityC7: "specific gravity of C7+ fraction",
            coefficientsTitle: "Coefficients A & B",
            bealBackground: "Carlton Beal developed this correlation in 1946, making it one of the earliest empirical correlations for crude oil viscosity. Beal's work was based on extensive laboratory measurements of dead oil samples (oil with no dissolved gas) from various California oil fields. His correlation became a foundation for later viscosity prediction methods.",
            bealHowItWorks: "The Beal correlation uses a simple exponential relationship between API gravity and temperature to estimate dead oil viscosity. It's specifically designed for oils at atmospheric pressure with no dissolved gas. The method works best for medium to light crude oils with API gravities between 10° and 40°.",
            deadOilViscosity: "dead oil viscosity (cP)",
            apiGravity: "API gravity (degrees)",
            beggsBackground: "H. Dale Beggs and J.R. Robinson published this correlation in 1975 in the Journal of Petroleum Technology. Their work was based on a comprehensive study of 2,073 data points from crude oils worldwide. The correlation was developed to predict both dead oil and saturated oil viscosities with improved accuracy over earlier methods.",
            beggsHowItWorks: "The Beggs-Robinson correlation uses a two-step approach: first calculating dead oil viscosity, then applying a correction factor for dissolved gas (if Rs is provided). The method incorporates API gravity and temperature in an exponential relationship. It's widely used in reservoir simulation and production engineering due to its simplicity and reasonable accuracy.",
            deadOil: "Dead Oil:",
            liveOil: "Live Oil (if Rs provided):",
            satOilViscosity: "saturated oil viscosity (cP)",
            solutionGas: "solution gas-oil ratio (scf/STB)",
            glasoBackground: "Øivind Glasø developed this correlation in 1980 based on data from North Sea crude oils. Published in the Journal of Petroleum Technology, Glasø's work aimed to improve viscosity predictions for the specific characteristics of North Sea oils, which often differ from oils in other regions. The correlation has since been widely adopted internationally.",
            glasoHowItWorks: "The Glasø correlation uses logarithmic relationships between API gravity, temperature, and solution gas-oil ratio. It first calculates dead oil viscosity using API and temperature, then applies a correction for dissolved gas effects. The method is particularly accurate for oils with API gravities between 20° and 48° and temperatures between 50°F and 300°F.",
            chewBackground: "J. Chew and C.A. Connally Jr. developed this correlation in 1959 while working at Shell Development Company. Their research focused on understanding how dissolved gas affects oil viscosity. The correlation was one of the first to systematically quantify the viscosity reduction effect of solution gas, which is critical for reservoir engineering calculations.",
            chewHowItWorks: "The Chew-Connally method uses a viscosity ratio approach, relating saturated oil viscosity to dead oil viscosity through the solution gas-oil ratio. The correlation applies a reduction factor based on Rs, acknowledging that dissolved gas significantly decreases oil viscosity. This method is particularly useful when dead oil viscosity is already known or can be estimated.",
            chewNote: "Note: If dead oil viscosity is not provided, it will be estimated using Beal's correlation with the provided API and temperature.",
            vazquezBackground: "M.E. Vazquez and H.D. Beggs developed this correlation in 1980, building upon earlier work by Beggs and Robinson. The correlation was specifically designed to handle undersaturated oil conditions (pressure above bubble point), which earlier correlations often struggled with. Their work was published in the Journal of Petroleum Engineering and has become a standard for undersaturated oil viscosity predictions.",
            vazquezHowItWorks: "The Vazquez-Beggs correlation uses a pressure-dependent exponential relationship for undersaturated oils. It requires viscosity at bubble point pressure (which can be estimated if not known) and applies a compression factor based on how far above bubble point the system pressure is. The method accounts for the fact that oil viscosity increases with pressure in undersaturated conditions.",
            oilViscosityP: "oil viscosity at pressure P (cP)",
            oilViscosityPb: "oil viscosity at bubble point pressure (cP)",
            systemPressure: "system pressure (psia)",
            bubblePointPressure: "bubble point pressure (psia)",
            gasSpecificGravity: "gas specific gravity",
            vazquezNote: "Note: If μob is not provided, it will be estimated using Beggs-Robinson correlation at saturated conditions.",
            validationRequired: "This field is required",
            validationNumber: "Please enter a valid number"
        },
        fr: {
            appTitle: "Calculateurs de Viscosité de l'Huile",
            appSubtitle: "Propriétés PVT - Corrélations Multiples",
            lbcSubtitle: "Corrélation de Lohrenz-Bray-Clark",
            lbcBackground: "La corrélation de Lohrenz-Bray-Clark (LBC) a été développée en 1964 par John Lohrenz, Bruce G. Bray et Charles R. Clark à la Standard Oil Company of California (aujourd'hui Chevron). Cette corrélation a été présentée dans leur article historique du Journal of Petroleum Technology et est depuis devenue l'une des méthodes les plus utilisées pour estimer la viscosité des fluides de réservoir dans l'industrie pétrolière.",
            lbcHowItWorks: "La corrélation LBC utilise un principe d'états correspondants modifié combiné à une densité adimensionnelle pour prédire la viscosité. La méthode relie la viscosité à la densité réduite et au poids moléculaire du mélange fluide. Elle fonctionne particulièrement bien pour les condensats de gaz et les systèmes d'huile volatile aux conditions du réservoir.",
            lbcFormulaIntro: "La corrélation LBC est exprimée comme suit :",
            mixtureViscosity: "viscosité du mélange (cP)",
            atmosphericViscosity: "viscosité atmosphérique (cP)",
            reducedDensity: "densité réduite (adimensionnelle)",
            viscosityParameter: "paramètre de viscosité lié au poids moléculaire et aux propriétés critiques",
            calculateBtn: "Calculer",
            resetBtn: "Réinitialiser",
            resultLabel: "Résultat :",
            footerText: "Calculateurs de Viscosité de l'Huile - Cours de Thermodynamique",
            lkBackground: "La corrélation Little-Kennedy a été développée en 1968 par J.E. Little et H.T. Kennedy Jr. à l'Université de l'Oklahoma. Leurs recherches visaient à créer une méthode plus précise pour prédire la viscosité des huiles lourdes, en particulier pour les huiles à poids moléculaire élevé et à densité spécifique élevée trouvées dans de nombreux réservoirs nord-américains.",
            lkHowItWorks: "Cette corrélation utilise une approche polynomiale complexe avec des facteurs de correction de température et de pression. Elle utilise deux ensembles de coefficients (A et B) qui tiennent compte de la complexité de la composition des huiles brutes. La méthode est particulièrement efficace pour les huiles brutes lourdes et intègre l'effet du poids moléculaire et de la densité spécifique de la fraction C7+.",
            formulaWhere: "Où :",
            oilViscosity: "viscosité de l'huile (cP)",
            temperature: "température",
            pressure: "pression",
            empiricalCoeffs: "coefficients empiriques",
            molWeightC7: "poids moléculaire de la fraction C7+",
            specGravityC7: "densité spécifique de la fraction C7+",
            coefficientsTitle: "Coefficients A & B",
            bealBackground: "Carlton Beal a développé cette corrélation en 1946, ce qui en fait l'une des premières corrélations empiriques pour la viscosité du pétrole brut.",
            bealHowItWorks: "La corrélation de Beal utilise une relation exponentielle simple entre la densité API et la température pour estimer la viscosité de l'huile morte.",
            deadOilViscosity: "viscosité de l'huile morte (cP)",
            apiGravity: "densité API (degrés)",
            beggsBackground: "H. Dale Beggs et J.R. Robinson ont publié cette corrélation en 1975 dans le Journal of Petroleum Technology.",
            beggsHowItWorks: "La corrélation Beggs-Robinson utilise une approche en deux étapes.",
            deadOil: "Huile Morte :",
            liveOil: "Huile Vive (si Rs fourni) :",
            satOilViscosity: "viscosité de l'huile saturée (cP)",
            solutionGas: "rapport gaz-huile en solution (scf/STB)",
            glasoBackground: "Øivind Glasø a développé cette corrélation en 1980.",
            glasoHowItWorks: "La corrélation de Glasø utilise des relations logarithmiques.",
            chewBackground: "J. Chew et C.A. Connally Jr. ont développé cette corrélation en 1959.",
            chewHowItWorks: "La méthode Chew-Connally utilise une approche de rapport de viscosité.",
            chewNote: "Note : Si la viscosité de l'huile morte n'est pas fournie, elle sera estimée.",
            vazquezBackground: "M.E. Vazquez et H.D. Beggs ont développé cette corrélation en 1980.",
            vazquezHowItWorks: "La corrélation Vazquez-Beggs utilise une relation exponentielle.",
            oilViscosityP: "viscosité de l'huile à la pression P (cP)",
            oilViscosityPb: "viscosité de l'huile à la pression du point de bulle (cP)",
            systemPressure: "pression du système (psia)",
            bubblePointPressure: "pression du point de bulle (psia)",
            gasSpecificGravity: "densité spécifique du gaz",
            vazquezNote: "Note : Si μob n'est pas fourni, il sera estimé.",
            validationRequired: "Ce champ est obligatoire",
            validationNumber: "Veuillez entrer un nombre valide"
        },
        ar: {
            appTitle: "حاسبات لزوجة النفط",
            appSubtitle: "خصائص PVT - ارتباطات متعددة",
            lbcSubtitle: "ارتباط لورنز-براي-كلارك",
            lbcBackground: "تم تطوير ارتباط لورنز-براي-كلارك (LBC) في عام 1964 بواسطة جون لورنز وبروس ج. براي وتشارلز ر. كلارك في شركة ستاندرد أويل أوف كاليفورنيا (شيفرون حاليًا).",
            lbcHowItWorks: "يستخدم ارتباط LBC مبدأ الحالات المتناظرة المعدل جنبًا إلى جنب مع الكثافة اللابعدية للتنبؤ باللزوجة.",
            lbcFormulaIntro: "يتم التعبير عن ارتباط LBC على النحو التالي:",
            mixtureViscosity: "لزوجة الخليط (cP)",
            atmosphericViscosity: "اللزوجة الجوية (cP)",
            reducedDensity: "الكثافة المختزلة (لابعدية)",
            viscosityParameter: "معامل اللزوجة المتعلق بالوزن الجزيئي والخصائص الحرجة",
            calculateBtn: "احسب",
            resetBtn: "إعادة تعيين",
            resultLabel: "النتيجة:",
            footerText: "حاسبات لزوجة النفط - دورة الديناميكا الحرارية",
            lkBackground: "تم تطوير ارتباط ليتل-كينيدي في عام 1968.",
            lkHowItWorks: "يستخدم هذا الارتباط نهجًا متعدد الحدود معقدًا.",
            formulaWhere: "حيث:",
            oilViscosity: "لزوجة النفط (cP)",
            temperature: "درجة الحرارة",
            pressure: "الضغط",
            empiricalCoeffs: "المعاملات التجريبية",
            molWeightC7: "الوزن الجزيئي لجزء C7+",
            specGravityC7: "الكثافة النوعية لجزء C7+",
            coefficientsTitle: "المعاملات A و B",
            bealBackground: "طور كارلتون بيل هذا الارتباط في عام 1946.",
            bealHowItWorks: "يستخدم ارتباط بيل علاقة أسية بسيطة.",
            deadOilViscosity: "لزوجة الزيت الميت (cP)",
            apiGravity: "كثافة API (درجات)",
            beggsBackground: "نشر إتش. ديل بيجز وجي. آر. روبنسون هذا الارتباط في عام 1975.",
            beggsHowItWorks: "يستخدم ارتباط بيجز-روبنسون نهجًا من خطوتين.",
            deadOil: "الزيت الميت:",
            liveOil: "الزيت الحي (إذا تم توفير Rs):",
            satOilViscosity: "لزوجة الزيت المشبع (cP)",
            solutionGas: "نسبة الغاز إلى الزيت (scf/STB)",
            glasoBackground: "طور أويفيند جلاسو هذا الارتباط في عام 1980.",
            glasoHowItWorks: "يستخدم ارتباط جلاسو علاقات لوغاريتمية.",
            chewBackground: "طور جي. تشيو وسي. إيه. كونالي جونيور هذا الارتباط في عام 1959.",
            chewHowItWorks: "تستخدم طريقة تشيو-كونالي نهج نسبة اللزوجة.",
            chewNote: "ملاحظة: إذا لم يتم توفير لزوجة الزيت الميت، فسيتم تقديرها.",
            vazquezBackground: "طور إم. إي. فاسكيز وإتش. دي. بيجز هذا الارتباط في عام 1980.",
            vazquezHowItWorks: "يستخدم ارتباط فاسكيز-بيجز علاقة أسية تعتمد على الضغط.",
            oilViscosityP: "لزوجة الزيت عند الضغط P (cP)",
            oilViscosityPb: "لزوجة الزيت عند ضغط نقطة الفقاعة (cP)",
            systemPressure: "ضغط النظام (psia)",
            bubblePointPressure: "ضغط نقطة الفقاعة (psia)",
            gasSpecificGravity: "الكثافة النوعية للغاز",
            vazquezNote: "ملاحظة: إذا لم يتم توفير μob، فسيتم تقديره.",
            validationRequired: "هذا الحقل مطلوب",
            validationNumber: "يرجى إدخال رقم صحيح"
        }
    };

    // ===== LANGUAGE SWITCHING =====
    const langSelect = document.getElementById('langSelect');
    let currentLang = localStorage.getItem('lang') || 'en';

    if (langSelect) {
        langSelect.value = currentLang;
        updateLanguage(currentLang);

        langSelect.addEventListener('change', (e) => {
            currentLang = e.target.value;
            updateLanguage(currentLang);
            localStorage.setItem('lang', currentLang);
        });
    }

    function updateLanguage(lang) {
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', lang);

        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
    }

    // ===== TAB SWITCHING =====
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(`${tabId}Tab`)?.classList.add('active');
        });
    });

    // ===== TABS SCROLL INDICATOR =====
    const tabsWrapper = document.querySelector('.tabs-wrapper');
    const tabs = document.querySelector('.tabs');
    if (tabs && tabsWrapper) {
        function checkScroll() {
            const canScroll = tabs.scrollWidth > tabs.clientWidth;
            const atEnd = tabs.scrollLeft + tabs.clientWidth >= tabs.scrollWidth - 10;
            tabsWrapper.classList.toggle('show-fade', canScroll && !atEnd);
        }
        tabs.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);
        checkScroll();
    }

    // ===== UNIT CONVERTER =====
    const UnitConverter = {
        convert: (value, fromUnit, toUnit) => {
            if (fromUnit === toUnit) return value;

            // Temperature
            if (['F', 'C', 'K', 'R'].includes(fromUnit) && ['F', 'C', 'K', 'R'].includes(toUnit)) {
                let tempK;
                switch (fromUnit) {
                    case 'F': tempK = (value - 32) * 5 / 9 + 273.15; break;
                    case 'C': tempK = value + 273.15; break;
                    case 'K': tempK = value; break;
                    case 'R': tempK = value * 5 / 9; break;
                }
                switch (toUnit) {
                    case 'F': return (tempK - 273.15) * 9 / 5 + 32;
                    case 'C': return tempK - 273.15;
                    case 'K': return tempK;
                    case 'R': return tempK * 9 / 5;
                }
            }

            // Pressure
            if (['psia', 'bar', 'kPa', 'atm'].includes(fromUnit) && ['psia', 'bar', 'kPa', 'atm'].includes(toUnit)) {
                let pressurePsia;
                switch (fromUnit) {
                    case 'psia': pressurePsia = value; break;
                    case 'bar': pressurePsia = value * 14.5038; break;
                    case 'kPa': pressurePsia = value * 0.145038; break;
                    case 'atm': pressurePsia = value * 14.6959; break;
                }
                switch (toUnit) {
                    case 'psia': return pressurePsia;
                    case 'bar': return pressurePsia / 14.5038;
                    case 'kPa': return pressurePsia / 0.145038;
                    case 'atm': return pressurePsia / 14.6959;
                }
            }

            // Viscosity
            if (['cP', 'Pas'].includes(fromUnit) && ['cP', 'Pas'].includes(toUnit)) {
                if (fromUnit === 'Pas' && toUnit === 'cP') return value * 1000;
                if (fromUnit === 'cP' && toUnit === 'Pas') return value / 1000;
            }

            // Gravity
            if (['API', 'SG'].includes(fromUnit) && ['API', 'SG'].includes(toUnit)) {
                if (fromUnit === 'SG' && toUnit === 'API') return (141.5 / value) - 131.5;
                if (fromUnit === 'API' && toUnit === 'SG') return 141.5 / (value + 131.5);
            }

            // Gas-Oil Ratio
            if (['scf/STB', 'm3/m3'].includes(fromUnit) && ['scf/STB', 'm3/m3'].includes(toUnit)) {
                if (fromUnit === 'm3/m3' && toUnit === 'scf/STB') return value * 5.615;
                if (fromUnit === 'scf/STB' && toUnit === 'm3/m3') return value / 5.615;
            }

            return value;
        }
    };

    // ===== PURE CALCULATION FUNCTIONS (OPTIMIZED) =====
    const ViscosityCorrelations = {
        lbc: (mu_o, rho_r, xi_m) => {
            const a1 = 0.1023, a2 = 0.023364, a3 = 0.058533, a4 = -0.040758, a5 = 0.0093324;
            const poly = a1 + (a2 * rho_r) + (a3 * Math.pow(rho_r, 2)) + (a4 * Math.pow(rho_r, 3)) + (a5 * Math.pow(rho_r, 4));
            return mu_o + (poly * Math.pow(10, -4) * xi_m);
        },
        beal: (api, tempF) => {
            const a = Math.pow(10, (0.43 + (8.33 / api)));
            return (0.32 + (1.8 * Math.pow(10, 7) / Math.pow(api, 4.53))) * Math.pow(360 / (tempF + 200), a);
        },
        beggs: (api, tempF, rs, p) => {
            // Dead Oil
            let z = 3.0324 - (0.02023 * api);
            let y = Math.pow(10, z);
            let x = y * Math.pow(tempF, -1.163);
            let muOd = Math.pow(10, x) - 1.0;
            // Saturated
            if (!isNaN(rs)) {
                let a = 10.715 * Math.pow(rs + 100, -0.515);
                let b = 5.44 * Math.pow(rs + 150, -0.338);
                return a * Math.pow(muOd, b);
            }
            return muOd;
        },
        glaso: (api, tempF, rs, p) => {
            // Dead Oil
            const logApi = Math.log10(api);
            const logT = Math.log10(tempF);
            const a_glaso = 10.313 * logT - 36.447;
            const muOd = 3.141e10 * Math.pow(tempF, -3.444) * Math.pow(logApi, a_glaso);
            // Saturated
            if (!isNaN(rs)) {
                const A = 10.715 * Math.pow(rs + 100, -0.515);
                const B = 5.44 * Math.pow(rs + 150, -0.338);
                return A * Math.pow(muOd, B);
            }
            return muOd;
        },
        chew: (muOd, rs, api, tempF) => {
            if (isNaN(muOd)) {
                // Estimate from Beggs if API/Temp provided
                if (!isNaN(api) && !isNaN(tempF)) {
                    let z = 3.0324 - (0.02023 * api);
                    let y = Math.pow(10, z);
                    let x = y * Math.pow(tempF, -1.163);
                    muOd = Math.pow(10, x) - 1.0;
                } else {
                    return NaN;
                }
            }
            const a = 0.2 + 0.8 * Math.pow(10, -0.00081 * rs);
            const b = 0.43 + 0.57 * Math.pow(10, -0.00072 * rs);
            return a * Math.pow(muOd, b);
        },
        vazquez: (p, pb, muOb, api, tempF, rs, yg) => {
            // Estimate muOb if needed
            if (isNaN(muOb)) {
                if (!isNaN(api) && !isNaN(tempF) && !isNaN(rs)) {
                    // Use Beggs Saturated
                    let z = 3.0324 - (0.02023 * api);
                    let y = Math.pow(10, z);
                    let x = y * Math.pow(tempF, -1.163);
                    let muOd = Math.pow(10, x) - 1.0;
                    let a = 10.715 * Math.pow(rs + 100, -0.515);
                    let b = 5.44 * Math.pow(rs + 150, -0.338);
                    muOb = a * Math.pow(muOd, b);
                } else {
                    return NaN;
                }
            }
            // Estimate Pb if needed
            if (isNaN(pb)) {
                if (!isNaN(rs) && !isNaN(yg) && !isNaN(api) && !isNaN(tempF)) {
                    const termPb = Math.pow(rs / yg, 0.83) * Math.pow(10, 0.00091 * tempF - 0.0125 * api);
                    pb = 18.2 * (termPb - 1.4);
                } else {
                    return NaN;
                }
            }

            if (p <= pb) return muOb;

            const m = 2.6 * Math.pow(p, 1.187) * Math.exp(-11.513 - (0.00898 * api));
            return muOb * Math.pow(p / pb, m);
        }
    };

    // ===== HELPER FUNCTIONS =====
    function getValueInUnit(elementId, targetUnit) {
        const element = document.getElementById(elementId);
        if (!element) return NaN;
        const value = parseFloat(element.value);
        const unitSelect = document.getElementById(elementId + '_unit');
        const fromUnit = unitSelect ? unitSelect.value : targetUnit;
        return UnitConverter.convert(value, fromUnit, targetUnit);
    }

    // ===== REALISTIC INPUT LIMITS (Petroleum Industry Standards) =====
    const INPUT_LIMITS = {
        // Temperature limits
        temperature: {
            F: { min: 32, max: 500, typical: '100-400°F' },
            C: { min: 0, max: 260, typical: '40-200°C' },
            K: { min: 273, max: 533, typical: '313-473K' },
            R: { min: 492, max: 960, typical: '560-860°R' }
        },
        // Pressure limits
        pressure: {
            psia: { min: 14.7, max: 25000, typical: '500-10,000 psia' },
            bar: { min: 1, max: 1724, typical: '35-700 bar' },
            kPa: { min: 101, max: 172400, typical: '3,500-70,000 kPa' },
            atm: { min: 1, max: 1700, typical: '35-680 atm' }
        },
        // API Gravity limits
        gravity: {
            API: { min: 5, max: 60, typical: '15-45° API' },
            SG: { min: 0.74, max: 1.05, typical: '0.80-0.95' }
        },
        // Gas-Oil Ratio limits
        gor: {
            'scf/STB': { min: 0, max: 5000, typical: '100-2000 scf/STB' },
            'm3/m3': { min: 0, max: 890, typical: '18-356 m³/m³' }
        },
        // Viscosity limits
        viscosity: {
            cP: { min: 0.01, max: 50000, typical: '0.1-1000 cP' },
            Pas: { min: 0.00001, max: 50, typical: '0.0001-1 Pa·s' }
        },
        // Bubble point pressure
        bubblePoint: {
            psia: { min: 100, max: 10000, typical: '500-5000 psia' }
        },
        // Reduced density (dimensionless)
        reducedDensity: { min: 0.01, max: 3.5, typical: '0.5-2.5' },
        // Viscosity parameter (dimensionless)
        viscosityParam: { min: 0.001, max: 10, typical: '0.01-5' },
        // Molecular weight
        molecularWeight: { min: 16, max: 800, typical: '100-400 g/mol' }
    };

    function validateInput(inputId, required = true, limitType = null, unit = null) {
        const input = document.getElementById(inputId);
        if (!input) return { valid: false, value: NaN, warning: null };

        const value = parseFloat(input.value);

        // Clear previous state
        input.classList.remove('error', 'success', 'warning');
        removeWarning(input);

        if (input.value.trim() === '') {
            if (required) {
                input.classList.add('error');
                return { valid: false, value: NaN, warning: null };
            }
            return { valid: true, value: NaN, warning: null };
        }

        if (isNaN(value)) {
            input.classList.add('error');
            return { valid: false, value: NaN, warning: null };
        }

        // Check realistic limits if specified
        if (limitType && INPUT_LIMITS[limitType]) {
            const limits = unit && INPUT_LIMITS[limitType][unit]
                ? INPUT_LIMITS[limitType][unit]
                : INPUT_LIMITS[limitType];

            if (limits.min !== undefined && limits.max !== undefined) {
                if (value < limits.min || value > limits.max) {
                    input.classList.add('warning');
                    const warningMsg = `Value outside typical range (${limits.min} - ${limits.max})`;
                    showWarning(input, warningMsg);
                    return { valid: true, value, warning: warningMsg };
                }
            }
        }

        input.classList.add('success');
        return { valid: true, value, warning: null };
    }

    function showWarning(input, message) {
        let warningEl = input.parentElement.querySelector('.input-warning');
        if (!warningEl) {
            warningEl = document.createElement('div');
            warningEl.className = 'input-warning';
            input.parentElement.appendChild(warningEl);
        }
        warningEl.textContent = '⚠️ ' + message;
        warningEl.style.display = 'block';
    }

    function removeWarning(input) {
        const warningEl = input.parentElement.querySelector('.input-warning');
        if (warningEl) {
            warningEl.style.display = 'none';
        }
    }

    function showError(containerId, message) {
        const container = document.getElementById(containerId);
        if (!container) return;

        let errorEl = container.querySelector('.error-message');
        if (!errorEl) {
            errorEl = document.createElement('div');
            errorEl.className = 'error-message';
            container.insertBefore(errorEl, container.querySelector('.result-container'));
        }
        errorEl.textContent = message;
        errorEl.classList.add('show');

        setTimeout(() => errorEl.classList.remove('show'), 3000);
    }

    function clearError(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const errorEl = container.querySelector('.error-message');
        if (errorEl) errorEl.classList.remove('show');
    }

    function displayResult(value, elementId, containerId) {
        const resultEl = document.getElementById(elementId);
        const container = document.getElementById(containerId);

        if (!resultEl || !container) return;

        resultEl.textContent = value.toFixed(4);
        container.classList.remove('hidden');

        // Trigger reflow for animation
        container.offsetHeight;
        container.classList.add('visible');

        // Celebration effect
        container.classList.add('celebrate');
        setTimeout(() => container.classList.remove('celebrate'), 600);

        // Animate Gauge
        const circle = container.querySelector('.progress-ring__circle');
        if (circle) {
            const radius = circle.r.baseVal.value;
            const circumference = 2 * Math.PI * radius;

            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            circle.style.strokeDashoffset = circumference; // Start empty

            // Force reflow
            circle.getBoundingClientRect();

            // Fill animation
            requestAnimationFrame(() => {
                circle.style.strokeDashoffset = '0';
            });
        }
    }

    function setLoading(btn, loading) {
        if (!btn) return;
        if (loading) {
            btn.classList.add('loading');
            btn.dataset.originalText = btn.textContent;
            btn.textContent = '';
        } else {
            btn.classList.remove('loading');
            if (btn.dataset.originalText) {
                btn.textContent = btn.dataset.originalText;
            }
        }
    }

    // ===== RESET FUNCTIONALITY =====
    document.querySelectorAll('.reset-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            if (!card) return;

            // Reset all inputs in the card
            card.querySelectorAll('input[type="number"]').forEach(input => {
                input.value = '';
                input.classList.remove('error', 'success');
            });

            // Reset selects to first option
            card.querySelectorAll('select').forEach(select => {
                select.selectedIndex = 0;
            });

            // Hide result container
            const resultContainer = card.querySelector('.result-container');
            if (resultContainer) {
                resultContainer.classList.remove('visible');
                resultContainer.classList.add('hidden');
            }

            // Clear any error messages
            const errorEl = card.querySelector('.error-message');
            if (errorEl) errorEl.classList.remove('show');
        });
    });

    // ===== LBC CALCULATOR =====
    document.getElementById('calculateBtn')?.addEventListener('click', function () {
        const btn = this;
        clearError('lbcTab');

        const mu_o = validateInput('mu_o');
        const rho_r = validateInput('rho_r');
        const xi_m = validateInput('xi_m');

        if (!mu_o.valid || !rho_r.valid || !xi_m.valid) {
            showError('lbcTab', translations[currentLang]?.validationRequired || 'Please fill all required fields');
            return;
        }

        setLoading(btn, true);

        setTimeout(() => {
            const muVal = getValueInUnit('mu_o', 'cP');
            const rhoVal = rho_r.value;
            const xiVal = xi_m.value;

            // LBC coefficients
            const a1 = 0.1023, a2 = 0.023364, a3 = 0.058533, a4 = -0.040758, a5 = 0.0093324;
            const poly = a1 + (a2 * rhoVal) + (a3 * Math.pow(rhoVal, 2)) + (a4 * Math.pow(rhoVal, 3)) + (a5 * Math.pow(rhoVal, 4));
            const result = muVal + (poly * Math.pow(10, -4) * xiVal);

            displayResult(result, 'resultValue', 'resultContainer');
            setLoading(btn, false);
        }, 300);
    });

    // ===== LITTLE-KENNEDY CALCULATOR =====
    document.getElementById('calculateLkBtn')?.addEventListener('click', function () {
        const btn = this;
        clearError('lkTab');

        const P = validateInput('lk_P');
        const T = validateInput('lk_T');
        const Mc7 = validateInput('lk_Mc7');
        const gammaC7 = validateInput('lk_gammaC7');
        const Ma = validateInput('lk_Ma');

        if (!P.valid || !T.valid || !Mc7.valid || !gammaC7.valid || !Ma.valid) {
            showError('lkTab', translations[currentLang]?.validationRequired || 'Please fill all required fields');
            return;
        }

        setLoading(btn, true);

        setTimeout(() => {
            const pVal = getValueInUnit('lk_P', 'atm');
            const tVal = getValueInUnit('lk_T', 'R');

            const A = [], B = [];
            for (let i = 0; i <= 10; i++) A[i] = parseFloat(document.getElementById(`A${i}`).value) || 0;
            for (let i = 0; i <= 11; i++) B[i] = parseFloat(document.getElementById(`B${i}`).value) || 0;

            let sumA = A[0];
            for (let i = 1; i <= 10; i++) {
                sumA += A[i] * Math.pow(Mc7.value * gammaC7.value / Ma.value, i);
            }

            let sumB = B[0];
            for (let i = 1; i <= 11; i++) {
                sumB += B[i] * Math.pow(Mc7.value * gammaC7.value / Ma.value, i);
            }

            const am = Math.exp(sumA);
            const bm = Math.exp(sumB);

            // Newton-Raphson
            let x = 1.0;
            for (let iter = 0; iter < 100; iter++) {
                const y = Math.pow(x, 3) - (bm * pVal / tVal) * Math.pow(x, 2) + (am / tVal) * x - (am * bm / tVal);
                const dy = 3 * Math.pow(x, 2) - (2 * bm * pVal / tVal) * x + (am / tVal);
                if (Math.abs(dy) < 1e-10) break;
                const x_new = x - (y / dy);
                if (Math.abs(x_new - x) < 1e-6) {
                    x = x_new;
                    break;
                }
                x = x_new;
            }

            displayResult(x, 'lkResultValue', 'lkResultContainer');
            setLoading(btn, false);
        }, 300);
    });

    // ===== BEAL CALCULATOR =====
    document.getElementById('calculateBealBtn')?.addEventListener('click', function () {
        const btn = this;
        clearError('bealTab');

        const api = validateInput('beal_api');
        const temp = validateInput('beal_temp');

        if (!api.valid || !temp.valid) {
            showError('bealTab', translations[currentLang]?.validationRequired || 'Please enter API and Temperature');
            return;
        }

        setLoading(btn, true);

        setTimeout(() => {
            const apiVal = getValueInUnit('beal_api', 'API');
            const tempVal = getValueInUnit('beal_temp', 'F');

            const a = Math.pow(10, 0.43 + (8.33 / apiVal));
            const term1 = 0.32 + (1.8e7 / Math.pow(apiVal, 4.53));
            const term2 = Math.pow(360 / (tempVal + 200), a);
            const result = term1 * term2;

            displayResult(result, 'bealResultValue', 'bealResultContainer');
            setLoading(btn, false);
        }, 300);
    });

    // ===== BEGGS-ROBINSON CALCULATOR =====
    document.getElementById('calculateBeggsBtn')?.addEventListener('click', function () {
        const btn = this;
        clearError('beggsTab');

        const api = validateInput('beggs_api');
        const temp = validateInput('beggs_temp');
        const rs = validateInput('beggs_rs', false);

        if (!api.valid || !temp.valid) {
            showError('beggsTab', translations[currentLang]?.validationRequired || 'Please enter API and Temperature');
            return;
        }

        setLoading(btn, true);

        setTimeout(() => {
            const apiVal = getValueInUnit('beggs_api', 'API');
            const tempVal = getValueInUnit('beggs_temp', 'F');
            const rsVal = getValueInUnit('beggs_rs', 'scf/STB');

            const y = Math.pow(10, 3.0324 - 0.02023 * apiVal);
            const x = y * Math.pow(tempVal, -1.163);
            const muOd = Math.pow(10, x) - 1;

            let result;
            if (!isNaN(rsVal)) {
                const a = 10.715 * Math.pow(rsVal + 100, -0.515);
                const b = 5.44 * Math.pow(rsVal + 150, -0.338);
                result = a * Math.pow(muOd, b);
            } else {
                result = muOd;
            }

            displayResult(result, 'beggsResultValue', 'beggsResultContainer');
            setLoading(btn, false);
        }, 300);
    });

    // ===== GLASO CALCULATOR =====
    document.getElementById('calculateGlasoBtn')?.addEventListener('click', function () {
        const btn = this;
        clearError('glasoTab');

        const api = validateInput('glaso_api');
        const temp = validateInput('glaso_temp');
        const rs = validateInput('glaso_rs', false);

        if (!api.valid || !temp.valid) {
            showError('glasoTab', translations[currentLang]?.validationRequired || 'Please enter API and Temperature');
            return;
        }

        setLoading(btn, true);

        setTimeout(() => {
            const apiVal = getValueInUnit('glaso_api', 'API');
            const tempVal = getValueInUnit('glaso_temp', 'F');
            const rsVal = getValueInUnit('glaso_rs', 'scf/STB');

            const logApi = Math.log10(apiVal);
            const logT = Math.log10(tempVal);
            const a_glaso = 10.313 * logT - 36.447;
            const muOd = 3.141e10 * Math.pow(tempVal, -3.444) * Math.pow(logApi, a_glaso);

            let result;
            if (!isNaN(rsVal)) {
                const A = 10.715 * Math.pow(rsVal + 100, -0.515);
                const B = 5.44 * Math.pow(rsVal + 150, -0.338);
                result = A * Math.pow(muOd, B);
            } else {
                result = muOd;
            }

            displayResult(result, 'glasoResultValue', 'glasoResultContainer');
            setLoading(btn, false);
        }, 300);
    });

    // ===== CHEW-CONNALLY CALCULATOR =====
    document.getElementById('calculateChewBtn')?.addEventListener('click', function () {
        const btn = this;
        clearError('chewTab');

        const muOdInput = validateInput('chew_muOd', false);
        const rs = validateInput('chew_rs');
        const api = validateInput('chew_api', false);
        const temp = validateInput('chew_temp', false);

        if (!rs.valid) {
            showError('chewTab', translations[currentLang]?.validationRequired || 'Please enter Rs');
            return;
        }

        setLoading(btn, true);

        setTimeout(() => {
            let muOd = getValueInUnit('chew_muOd', 'cP');
            const rsVal = getValueInUnit('chew_rs', 'scf/STB');
            const apiVal = getValueInUnit('chew_api', 'API');
            const tempVal = getValueInUnit('chew_temp', 'F');

            if (isNaN(muOd) && !isNaN(apiVal) && !isNaN(tempVal)) {
                const y = Math.pow(10, 3.0324 - 0.02023 * apiVal);
                const x = y * Math.pow(tempVal, -1.163);
                muOd = Math.pow(10, x) - 1;
            }

            if (isNaN(muOd)) {
                showError('chewTab', 'Please enter Dead Oil Viscosity or API+Temperature');
                setLoading(btn, false);
                return;
            }

            const a = 0.2 + 0.8 * Math.pow(10, -0.00081 * rsVal);
            const b = 0.43 + 0.57 * Math.pow(10, -0.00072 * rsVal);
            const result = a * Math.pow(muOd, b);

            displayResult(result, 'chewResultValue', 'chewResultContainer');
            setLoading(btn, false);
        }, 300);
    });

    // ===== VAZQUEZ-BEGGS CALCULATOR =====
    document.getElementById('calculateVazquezBtn')?.addEventListener('click', function () {
        const btn = this;
        clearError('vazquezTab');

        const p = validateInput('vazquez_p');

        if (!p.valid) {
            showError('vazquezTab', translations[currentLang]?.validationRequired || 'Please enter Pressure');
            return;
        }

        setLoading(btn, true);

        setTimeout(() => {
            const pVal = getValueInUnit('vazquez_p', 'psia');
            let pb = getValueInUnit('vazquez_pb', 'psia');
            let muOb = getValueInUnit('vazquez_muOb', 'cP');
            const apiVal = getValueInUnit('vazquez_api', 'API');
            const tempVal = getValueInUnit('vazquez_temp', 'F');
            const rsVal = parseFloat(document.getElementById('vazquez_rs').value);
            const yg = parseFloat(document.getElementById('vazquez_yg').value);

            // Estimate muOb if needed
            if (isNaN(muOb) && !isNaN(apiVal) && !isNaN(tempVal) && !isNaN(rsVal)) {
                const y = Math.pow(10, 3.0324 - 0.02023 * apiVal);
                const x = y * Math.pow(tempVal, -1.163);
                const muOd = Math.pow(10, x) - 1;
                const a = 10.715 * Math.pow(rsVal + 100, -0.515);
                const b = 5.44 * Math.pow(rsVal + 150, -0.338);
                muOb = a * Math.pow(muOd, b);
            }

            // Estimate Pb if needed
            if (isNaN(pb) && !isNaN(rsVal) && !isNaN(yg) && !isNaN(apiVal) && !isNaN(tempVal)) {
                const termPb = Math.pow(rsVal / yg, 0.83) * Math.pow(10, 0.00091 * tempVal - 0.0125 * apiVal);
                pb = 18.2 * (termPb - 1.4);
            }

            if (isNaN(pb) || isNaN(muOb)) {
                showError('vazquezTab', 'Please provide Pb and μOb or estimation parameters');
                setLoading(btn, false);
                return;
            }

            let result;
            if (pVal <= pb) {
                result = muOb;
            } else {
                const m = 2.6e-5 * Math.pow(pVal, 1.187) * Math.exp(-11.513 - 8.98e-5 * pVal);
                result = muOb * Math.pow(pVal / pb, m);
            }

            displayResult(result, 'vazquezResultValue', 'vazquezResultContainer');
            setLoading(btn, false);
        }, 300);
    });

    // ===== INPUT VALIDATION ON BLUR =====
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('blur', function () {
            if (this.value.trim() !== '') {
                const value = parseFloat(this.value);
                this.classList.remove('error', 'success');
                if (isNaN(value)) {
                    this.classList.add('error');
                } else {
                    this.classList.add('success');
                }
            }
        });

        input.addEventListener('focus', function () {
            this.classList.remove('error', 'success');
        });
    });

    // =========================================
    // PHASE 7: DRAMATIC SPACE EFFECTS
    // =========================================



    // 2. Shooting Stars (Optimized - less frequent)
    function createShootingStar() {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 50}%`;
        document.body.appendChild(star);
        setTimeout(() => star.remove(), 2000);
    }

    // Create shooting stars less frequently (every 15-25 seconds)
    setInterval(createShootingStar, 15000 + Math.random() * 10000);
    setTimeout(createShootingStar, 3000);

    // 3. Particle Explosion on Result (Optimized - fewer particles)
    function createExplosion(container) {
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const colors = ['#8b5cf6', '#06b6d4', '#ec4899', '#10b981'];

        for (let i = 0; i < 12; i++) { // Reduced from 20 to 12
            const particle = document.createElement('div');
            particle.className = 'result-particle';
            const angle = (Math.PI * 2 * i) / 12;
            const distance = 60 + Math.random() * 40;
            particle.style.left = `${centerX}px`;
            particle.style.top = `${centerY}px`;
            particle.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
            particle.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
            particle.style.background = colors[i % colors.length];
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 800);
        }
    }

    // Override displayResult to add explosion
    const originalDisplayResult = window.displayResultWithExplosion;
    window.displayResultWithExplosion = function (value, elementId, containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            setTimeout(() => createExplosion(container), 300);
        }
    };

    // Hook into result containers
    document.querySelectorAll('.result-container').forEach(container => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (container.classList.contains('visible') && !container.classList.contains('exploded')) {
                        container.classList.add('exploded');
                        createExplosion(container);
                        setTimeout(() => container.classList.remove('exploded'), 2000);
                    }
                }
            });
        });
        observer.observe(container, { attributes: true });
    });
});


