import React, { useState, useEffect } from 'react';
import {
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  Users,
  UtensilsCrossed,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  X,
  Menu as MenuIcon,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  FileCheck,
  HelpCircle,
  HeartHandshake,
  ArrowRight,
  Info
} from 'lucide-react';

export default function App() {
  // Navigation & Drawer states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeGalleryFilter, setActiveGalleryFilter] = useState('all');
  const [activeLightboxImg, setActiveLightboxImg] = useState(null);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [ownerChecklistOpen, setOwnerChecklistOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    eventType: '',
    eventDate: '',
    eventLocation: '',
    guestCount: '',
    serviceRequired: '',
    foodRequests: '',
    budgetRange: '',
    additionalNotes: '',
    privacyAccepted: false,
    honeypot: '' // Spam trap field
  });

  // Form validation errors & submission state
  const [errors, setErrors] = useState({});
  const [demoSubmitNotice, setDemoSubmitNotice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // WhatsApp configuration based on public listing
  const rawPhone = "08053067604";
  const internationalPhone = "2348053067604";
  const defaultWhatsAppMsg = encodeURIComponent(
    "Hello Precious Catering Services. I would like to enquire about catering for an upcoming event. Please let me know the available services and how I can request a quotation."
  );
  const defaultWhatsAppUrl = `https://wa.me/${internationalPhone}?text=${defaultWhatsAppMsg}`;

  // Services definition
  const services = [
    {
      id: "wedding",
      title: "Wedding Catering",
      shortDesc: "Elegant spreads, banquet presentation, and courteous reception service tailored to your special day.",
      badge: "Proposed Service",
      image: "https://images.unsplash.com/photo-1519225438127-1f486b72d242?auto=format&fit=crop&w=800&q=80",
      alt: "Nigerian wedding buffet table setting"
    },
    {
      id: "birthday",
      title: "Birthday & Private Celebrations",
      shortDesc: "Customized menus and celebratory catering for milestone birthdays, anniversaries, and personal events.",
      badge: "Proposed Service",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
      alt: "Celebration party buffet arrangement"
    },
    {
      id: "corporate",
      title: "Corporate & Office Catering",
      shortDesc: "Timely breakfasts, boxed lunches, and seminar food trays designed for corporate meetings and retreats.",
      badge: "Proposed Service",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
      alt: "Corporate luncheon buffet spread"
    },
    {
      id: "small-chops",
      title: "Party Food & Small Chops",
      shortDesc: "Puff-puff, samosas, spring rolls, peppered gizzard, and bite-sized finger foods for any party size.",
      badge: "Proposed Service",
      image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80",
      alt: "Assorted hot small chops and finger foods"
    },
    {
      id: "family",
      title: "Family Gatherings & Dedications",
      shortDesc: "Generous home-style African dishes, soups, and traditional favorites cooked for family celebrations.",
      badge: "Proposed Service",
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
      alt: "Family celebration dining table"
    },
    {
      id: "delivery",
      title: "Food Trays & Delivery Enquiries",
      shortDesc: "Pre-ordered food trays prepared fresh. Delivery areas, charges, and schedule to be confirmed directly.",
      badge: "Subject to Confirmation",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
      alt: "Packaged hot party food containers"
    }
  ];

  // Gallery definition with realistic food placeholders
  const galleryItems = [
    {
      id: 1,
      title: "Party Jollof Rice & Proteins",
      category: "main",
      tag: "Main Courses",
      image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=900&q=80",
      desc: "Richly seasoned firewood-style smoky Jollof rice, plantains, and roasted meats (Placeholder)."
    },
    {
      id: 2,
      title: "Fried Rice & Grilled Chicken",
      category: "main",
      tag: "Main Courses",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=900&q=80",
      desc: "Vibrant vegetable fried rice served with spiced grilled chicken and salad garnishes (Placeholder)."
    },
    {
      id: 3,
      title: "Nigerian Small Chops Platter",
      category: "chops",
      tag: "Small Chops",
      image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=900&q=80",
      desc: "Golden puff puff, crunchy spring rolls, meat pies, and peppered chicken bites (Placeholder)."
    },
    {
      id: 4,
      title: "Buffet Table Presentation",
      category: "events",
      tag: "Buffet Setups",
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=900&q=80",
      desc: "Chafing dishes, warmers, and organized service layout for wedding guests (Placeholder)."
    },
    {
      id: 5,
      title: "Party Trays & Savory Pastries",
      category: "chops",
      tag: "Party Trays",
      image: "https://images.unsplash.com/photo-1619895092538-128341789043?auto=format&fit=crop&w=900&q=80",
      desc: "Bite-size finger foods ready for social gatherings and meetings (Placeholder)."
    },
    {
      id: 6,
      title: "VIP Banquet Table Setting",
      category: "events",
      tag: "Event Setup",
      image: "https://images.unsplash.com/photo-1519225438127-1f486b72d242?auto=format&fit=crop&w=900&q=80",
      desc: "Polished banquet layout with coordinated tableware and menu signage (Placeholder)."
    }
  ];

  const filteredGallery = activeGalleryFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeGalleryFilter);

  // Form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Scroll smoothly to form and preselect a service
  const handleEnquireService = (serviceTitle) => {
    setFormData(prev => ({
      ...prev,
      serviceRequired: serviceTitle
    }));
    const formElement = document.getElementById('quote-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Field validation
  const validateForm = () => {
    const newErrors = {};

    // Honeypot anti-spam
    if (formData.honeypot) {
      newErrors.spam = "Bot detected";
      return { isValid: false, errors: newErrors };
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name";
    }

    // Nigerian phone validation (accepts 080..., 070..., 090..., 081..., +234..., 234...)
    const cleanPhone = formData.phone.replace(/[\s-]/g, '');
    const phoneRegex = /^(?:\+?234|0)[789][01]\d{8}$/;
    if (!cleanPhone) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(cleanPhone)) {
      newErrors.phone = "Please enter a valid Nigerian phone number (e.g. 08053067604)";
    }

    // Optional email validation
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = "Please provide a valid email address (e.g. name@domain.com)";
      }
    }

    if (!formData.eventType) {
      newErrors.eventType = "Please select the type of event";
    }

    if (!formData.eventLocation.trim()) {
      newErrors.eventLocation = "Event location or area in Ibadan/Oyo State is required";
    }

    const guests = parseInt(formData.guestCount, 10);
    if (!formData.guestCount || isNaN(guests) || guests <= 0) {
      newErrors.guestCount = "Please enter an estimated guest count (greater than 0)";
    }

    if (!formData.serviceRequired) {
      newErrors.serviceRequired = "Please select the catering service required";
    }

    if (!formData.privacyAccepted) {
      newErrors.privacyAccepted = "You must acknowledge the demo data policy before proceeding";
    }

    return {
      isValid: Object.keys(newErrors).length === 0,
      errors: newErrors
    };
  };

  // Compile WhatsApp message string from form data
  const generateWhatsAppMessage = () => {
    let msg = `*NEW EVENT ENQUIRY - Precious Catering Services*\n\n`;
    msg += `*Client Name:* ${formData.fullName.trim()}\n`;
    msg += `*Phone:* ${formData.phone.trim()}\n`;
    if (formData.email.trim()) {
      msg += `*Email:* ${formData.email.trim()}\n`;
    }
    msg += `*Event Type:* ${formData.eventType}\n`;
    if (formData.eventDate) {
      msg += `*Event Date:* ${formData.eventDate}\n`;
    }
    msg += `*Location:* ${formData.eventLocation.trim()}\n`;
    msg += `*Estimated Guests:* ${formData.guestCount}\n`;
    msg += `*Service Requested:* ${formData.serviceRequired}\n`;
    if (formData.budgetRange) {
      msg += `*Estimated Budget:* ${formData.budgetRange}\n`;
    }
    if (formData.foodRequests.trim()) {
      msg += `*Food Requests:* ${formData.foodRequests.trim()}\n`;
    }
    if (formData.additionalNotes.trim()) {
      msg += `*Notes:* ${formData.additionalNotes.trim()}\n`;
    }
    msg += `\n_Sent via Precious Catering Website Concept Preview._`;
    return encodeURIComponent(msg);
  };

  // Handler: Continue via WhatsApp
  const handleContinueWhatsApp = (e) => {
    e.preventDefault();
    const { isValid, errors: validationErrors } = validateForm();

    if (!isValid) {
      setErrors(validationErrors);
      setDemoSubmitNotice({
        type: 'error',
        message: 'Please resolve the highlighted fields before opening WhatsApp.'
      });
      return;
    }

    setErrors({});
    const encodedMsg = generateWhatsAppMessage();
    const url = `https://wa.me/${internationalPhone}?text=${encodedMsg}`;

    setDemoSubmitNotice({
      type: 'info',
      message: 'Opening WhatsApp with your formatted enquiry summary. Please tap "Send" once WhatsApp opens.'
    });

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Handler: Demo Submit
  const handleDemoSubmit = (e) => {
    e.preventDefault();
    const { isValid, errors: validationErrors } = validateForm();

    if (!isValid) {
      setErrors(validationErrors);
      setDemoSubmitNotice({
        type: 'error',
        message: 'Please correct the highlighted errors to preview submission.'
      });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setDemoSubmitNotice({
        type: 'demo_success',
        message: 'Demo Validation Successful: In this preview version, enquiries are not stored in a live backend database. To deliver your enquiry directly to Precious Catering Services right now, please click "Continue via WhatsApp" below or call 08053067604.'
      });
    }, 600);
  };

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveLightboxImg(null);
        setPrivacyModalOpen(false);
        setOwnerChecklistOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C2420] font-sans antialiased selection:bg-[#58111A] selection:text-[#FDFBF7]">

      {/* TOP DEMO CONCEPT DISCLAIMER BAR */}
      <aside aria-label="Demo notice" className="bg-[#58111A] text-amber-100 text-xs sm:text-sm border-b border-amber-900/40 px-4 py-2.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <p>
              <strong className="font-semibold text-amber-300">Website Concept Preview:</strong> Business details, proposed menus, images, and booking terms are subject to owner confirmation.
            </p>
          </div>
          <button
            onClick={() => setOwnerChecklistOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs text-amber-200 hover:text-white underline underline-offset-4 font-medium transition-colors cursor-pointer"
          >
            <FileCheck className="w-3.5 h-3.5" />
            Owner Launch Checklist
          </button>
        </div>
      </aside>

      {/* MAIN NAVIGATION */}
      <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo & Name */}
            <a href="#home" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#58111A] rounded-lg p-1">
              <div className="w-11 h-11 rounded-full bg-[#58111A] flex items-center justify-center text-amber-300 font-serif font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
                P
              </div>
              <div className="text-left">
                <span className="block font-serif text-lg sm:text-xl font-bold tracking-tight text-[#58111A] leading-tight">
                  Precious Catering
                </span>
                <span className="block text-[10px] sm:text-xs tracking-wider uppercase text-stone-600 font-medium">
                  &amp; Event Management • Agbowo, Ibadan
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-stone-700">
              <a href="#home" className="hover:text-[#58111A] transition-colors">Home</a>
              <a href="#services" className="hover:text-[#58111A] transition-colors">Services</a>
              <a href="#gallery" className="hover:text-[#58111A] transition-colors">Food Gallery</a>
              <a href="#about" className="hover:text-[#58111A] transition-colors">About</a>
              <a href="#quote-form" className="hover:text-[#58111A] transition-colors">Request a Quote</a>
              <a href="#contact" className="hover:text-[#58111A] transition-colors">Contact</a>
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={`tel:${rawPhone}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#58111A] bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-full transition-all shadow-sm"
                title="Call 08053067604"
              >
                <Phone className="w-3.5 h-3.5 text-[#58111A]" />
                <span>08053067604</span>
              </a>

              <a
                href="#quote-form"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#58111A] hover:bg-[#430c13] rounded-full shadow-md hover:shadow-lg transition-all"
              >
                <span>Book Event</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={`tel:${rawPhone}`}
                className="p-2 text-[#58111A] hover:bg-stone-100 rounded-full"
                aria-label="Call business"
              >
                <Phone className="w-5 h-5" />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-stone-700 hover:text-[#58111A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#58111A]"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF6F0] border-b border-stone-200 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col space-y-2 text-base font-medium text-stone-800">
              <a
                href="#home"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-amber-100/60"
              >
                Home
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-amber-100/60"
              >
                Services
              </a>
              <a
                href="#gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-amber-100/60"
              >
                Food Gallery
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-amber-100/60"
              >
                About
              </a>
              <a
                href="#quote-form"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-amber-100/60"
              >
                Request a Quote
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-amber-100/60"
              >
                Contact
              </a>
            </nav>
            <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
              <a
                href={defaultWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#25D366] text-white text-sm font-semibold shadow hover:bg-[#20b857]"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
              <a
                href={`tel:${rawPhone}`}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-stone-100 text-stone-800 text-sm font-semibold border border-stone-300"
              >
                <Phone className="w-4 h-4 text-[#58111A]" />
                Call 08053067604
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section id="home" className="relative overflow-hidden bg-gradient-to-b from-[#FAF6F0] via-[#FDFBF7] to-[#FAF6F0] py-14 sm:py-20 lg:py-28 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/70 border border-amber-300 text-[#58111A] text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Catering &amp; Events in Agbowo, Ibadan</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-[#58111A] tracking-tight leading-[1.12]">
                Making Every Occasion Delicious.
              </h1>

              <p className="text-lg sm:text-xl text-stone-700 max-w-2xl leading-relaxed">
                Explore catering options for your next celebration or gathering in Ibadan. Contact us to discuss your menu, guest count, and event requirements.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href="#quote-form"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#58111A] hover:bg-[#430c13] text-white text-base font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                >
                  <span>Request a Quote</span>
                  <ChevronRight className="w-4 h-4" />
                </a>

                <a
                  href={defaultWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20b857] text-white text-base font-semibold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              {/* Public Trust Notes */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-stone-600 text-xs sm:text-sm">
                <div className="flex items-center justify-center lg:justify-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Local Agbowo Address</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Public Telephone Listed</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-1.5 col-span-2 sm:col-span-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Custom Event Quotes</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Spread */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative border frame */}
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-amber-300 via-[#58111A]/20 to-amber-200 opacity-60 blur-sm"></div>

                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-stone-900 border border-stone-200">
                  <img
                    src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1000&q=80"
                    alt="Nigerian banquet celebration table spread"
                    className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold mb-1">
                      Concept Showcase
                    </span>
                    <h3 className="text-xl font-serif font-bold">
                      Delicious Moments, Beautifully Served
                    </h3>
                    <p className="text-xs text-stone-300 mt-1">
                      Illustrative placeholder imagery ready to be updated with Precious Catering's authentic event spreads.
                    </p>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-5 -left-4 sm:left-4 bg-[#FAF6F0] p-3.5 rounded-xl border border-amber-200/90 shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-[#58111A]">
                    <UtensilsCrossed className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-500 font-medium">Location</p>
                    <p className="text-sm font-bold text-stone-900">Agbowo, Ibadan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROPOSED SERVICES SECTION */}
      <section id="services" className="py-16 sm:py-24 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs uppercase tracking-widest font-bold text-[#58111A]">
              Proposed Catering Options
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#58111A]">
              Services for Your Special Occasions
            </h2>
            <p className="text-stone-600 text-sm sm:text-base">
              Service categories are proposed concepts and subject to direct confirmation by the business owner.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="group bg-[#FAF6F0] rounded-2xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-stone-200">
                    <img
                      src={service.image}
                      alt={service.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3 bg-[#58111A]/90 backdrop-blur-sm text-amber-200 text-[11px] font-semibold px-2.5 py-1 rounded-full">
                      {service.badge}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      {service.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleEnquireService(service.title)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#58111A] text-[#58111A] hover:bg-[#58111A] hover:text-white text-sm font-semibold transition-colors duration-200"
                  >
                    <span>Enquire About This Service</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-stone-600 bg-amber-50 inline-block px-4 py-2 rounded-full border border-amber-200">
              * Note: Delivery areas, package tiers, and minimum orders are subject to discussion. No fixed prices are assumed.
            </p>
          </div>
        </div>
      </section>

      {/* FOOD & EVENT GALLERY */}
      <section id="gallery" className="py-16 sm:py-24 bg-[#FAF6F0] border-t border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <span className="text-xs uppercase tracking-widest font-bold text-emerald-800">
              Visual Gallery
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#58111A]">
              Proposed Menu &amp; Event Showcase
            </h2>
            <p className="text-stone-600 text-sm sm:text-base">
              Illustrative placeholder photographs showing potential food presentation styles. Real client work photos will replace these placeholders upon owner approval.
            </p>

            {/* Filter buttons */}
            <div className="flex flex-wrap justify-center gap-2 pt-3">
              {[
                { id: 'all', label: 'All Showcase' },
                { id: 'main', label: 'Jollof & Mains' },
                { id: 'chops', label: 'Small Chops & Pastries' },
                { id: 'events', label: 'Buffet & Event Presentation' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveGalleryFilter(tab.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeGalleryFilter === tab.id
                      ? 'bg-[#58111A] text-amber-200 shadow-sm'
                      : 'bg-[#FDFBF7] text-stone-700 border border-stone-300 hover:border-[#58111A]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of gallery cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveLightboxImg(item)}
                className="group relative cursor-pointer rounded-2xl overflow-hidden bg-stone-900 border border-stone-200 shadow hover:shadow-xl transition-all"
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5 text-white">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-300">
                    {item.tag} • Illustrative Placeholder
                  </span>
                  <h3 className="font-serif font-bold text-lg mt-0.5">{item.title}</h3>
                  <p className="text-xs text-stone-300 mt-1 line-clamp-2">{item.desc}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-[11px] text-amber-200 font-medium">
                    Click to view details <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-stone-700 text-xs text-center max-w-2xl mx-auto">
            <p>
              <strong>Notice for Business Owner:</strong> We can easily replace all stock images above with your own high-resolution photographs of wedding buffets, trays, and chops.
            </p>
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {activeLightboxImg && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image Preview"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveLightboxImg(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-[#FAF6F0] rounded-2xl overflow-hidden shadow-2xl border border-stone-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveLightboxImg(null)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
              aria-label="Close image modal"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={activeLightboxImg.image}
              alt={activeLightboxImg.title}
              className="w-full max-h-96 object-cover"
            />
            <div className="p-6">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#58111A]">
                {activeLightboxImg.tag} (Placeholder Stock)
              </span>
              <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1">
                {activeLightboxImg.title}
              </h3>
              <p className="text-stone-700 text-sm mt-2">
                {activeLightboxImg.desc}
              </p>
              <div className="mt-4 pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-stone-600">
                  Ready to enquire for your date?
                </span>
                <button
                  onClick={() => {
                    const title = activeLightboxImg.title;
                    setActiveLightboxImg(null);
                    handleEnquireService(title);
                  }}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#58111A] text-white text-xs font-semibold hover:bg-[#430c13]"
                >
                  Enquire About This Menu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ABOUT SECTION (Strict adherence to facts only) */}
      <section id="about" className="py-16 sm:py-24 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold">
                <Info className="w-3.5 h-3.5 text-[#58111A]" />
                <span>About the Business</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#58111A]">
                Precious Catering Services &amp; Event Management
              </h2>

              {/* Exact requested text */}
              <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-medium">
                Precious Catering Services &amp; Event Management is listed as a catering business in Agbowo, Ibadan. We invite you to enquire about catering options for your upcoming gathering and discuss the arrangements that suit your event.
              </p>

              <div className="p-5 rounded-2xl bg-[#FAF6F0] border border-amber-200/80 space-y-3">
                <h4 className="text-sm font-bold text-[#58111A] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  Reserved Area for Owner's Official Story
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  To ensure complete transparency and integrity, no unverified company history, founding dates, awards, client reviews, or staff biographies have been fabricated for this preview.
                </p>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Once confirmed by the business owner, this section will host the verified company background, head chef profile, and authentic event testimonials.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                  <p className="text-xs text-stone-500 uppercase tracking-wider">Location</p>
                  <p className="text-sm font-semibold text-stone-900 mt-0.5">Agbowo, Ibadan, Oyo State</p>
                </div>
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                  <p className="text-xs text-stone-500 uppercase tracking-wider">Public Telephone</p>
                  <p className="text-sm font-semibold text-stone-900 mt-0.5">08053067604</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-xl bg-stone-100">
                <img
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80"
                  alt="Professional banquet service setup placeholder"
                  className="w-full h-96 object-cover"
                />
                <div className="p-6 bg-[#FAF6F0] border-t border-stone-200">
                  <p className="text-xs text-stone-500 italic">
                    Placeholder photo representing professional hospitality and event management standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING AND QUOTATION FORM SECTION */}
      <section id="quote-form" className="py-16 sm:py-24 bg-[#FAF6F0] border-t border-stone-200 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-10">
            <span className="text-xs uppercase tracking-widest font-bold text-[#58111A]">
              Get A Quotation
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#58111A]">
              Request an Event Catering Estimate
            </h2>
            <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto">
              Please share the key details of your occasion. We do not assume fixed package costs—each quotation is prepared based on your guest count and menu preferences.
            </p>
          </div>

          {/* Demo Submission Notifications */}
          {demoSubmitNotice && (
            <div
              className={`mb-8 p-4 rounded-xl border flex items-start gap-3 ${
                demoSubmitNotice.type === 'error'
                  ? 'bg-red-50 border-red-300 text-red-900'
                  : demoSubmitNotice.type === 'demo_success'
                  ? 'bg-amber-50 border-amber-300 text-amber-950'
                  : 'bg-emerald-50 border-emerald-300 text-emerald-950'
              }`}
            >
              {demoSubmitNotice.type === 'error' ? (
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              ) : (
                <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div className="text-sm">
                <p className="font-semibold">
                  {demoSubmitNotice.type === 'error'
                    ? 'Please Check Form Entries'
                    : 'Interactive Demo Notice'}
                </p>
                <p className="mt-0.5 leading-relaxed">{demoSubmitNotice.message}</p>
                {demoSubmitNotice.type === 'demo_success' && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={handleContinueWhatsApp}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#25D366] text-white text-xs font-bold hover:bg-[#20b857]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Forward Details to WhatsApp Now
                    </button>
                    <a
                      href={`tel:${rawPhone}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-stone-800 text-white text-xs font-bold hover:bg-stone-900"
                    >
                      <Phone className="w-4 h-4" />
                      Call 08053067604 Directly
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* The Interactive Form */}
          <form
            onSubmit={handleDemoSubmit}
            noValidate
            className="bg-[#FDFBF7] rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-xl space-y-6"
          >
            {/* Honeypot Spam Protection Field (Hidden from humans) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="hp_catering">Leave this field blank</label>
              <input
                type="text"
                id="hp_catering"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleInputChange}
                tabIndex="-1"
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Olumide Adeleke"
                  className={`w-full px-4 py-2.5 rounded-xl bg-[#FAF6F0] border text-stone-900 text-sm focus:outline-none focus:ring-2 ${
                    errors.fullName ? 'border-red-500 focus:ring-red-200' : 'border-stone-300 focus:ring-[#58111A]/20 focus:border-[#58111A]'
                  }`}
                  required
                />
                {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phone" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Phone Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="e.g. 08053067604"
                  className={`w-full px-4 py-2.5 rounded-xl bg-[#FAF6F0] border text-stone-900 text-sm focus:outline-none focus:ring-2 ${
                    errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-stone-300 focus:ring-[#58111A]/20 focus:border-[#58111A]'
                  }`}
                  required
                />
                {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Email Address (Optional) */}
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-stone-600 font-normal normal-case">(Optional)</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. yourname@example.com"
                  className={`w-full px-4 py-2.5 rounded-xl bg-[#FAF6F0] border text-stone-900 text-sm focus:outline-none focus:ring-2 ${
                    errors.email ? 'border-red-500 focus:ring-red-200' : 'border-stone-300 focus:ring-[#58111A]/20 focus:border-[#58111A]'
                  }`}
                />
                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
              </div>

              {/* Event Type */}
              <div>
                <label htmlFor="eventType" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Type of Event <span className="text-red-600">*</span>
                </label>
                <select
                  id="eventType"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 rounded-xl bg-[#FAF6F0] border text-stone-900 text-sm focus:outline-none focus:ring-2 ${
                    errors.eventType ? 'border-red-500 focus:ring-red-200' : 'border-stone-300 focus:ring-[#58111A]/20 focus:border-[#58111A]'
                  }`}
                  required
                >
                  <option value="">Select Event Type</option>
                  <option value="Wedding Reception">Wedding Reception</option>
                  <option value="Birthday Celebration">Birthday Celebration</option>
                  <option value="Corporate Gathering">Corporate Gathering / Seminar</option>
                  <option value="Family Event / Dedication">Family Event / Dedication</option>
                  <option value="Burial Ceremony / Reception">Burial Ceremony / Reception</option>
                  <option value="Other Celebration">Other Gathering</option>
                </select>
                {errors.eventType && <p className="text-xs text-red-600 mt-1">{errors.eventType}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Event Date */}
              <div>
                <label htmlFor="eventDate" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Event Date <span className="text-stone-600 font-normal normal-case">(If known)</span>
                </label>
                <input
                  type="date"
                  id="eventDate"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6F0] border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#58111A]/20 focus:border-[#58111A]"
                />
              </div>

              {/* Event Location */}
              <div>
                <label htmlFor="eventLocation" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Event Location / Venue <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="eventLocation"
                  name="eventLocation"
                  value={formData.eventLocation}
                  onChange={handleInputChange}
                  placeholder="e.g. Agbowo / Bodija / UI Area, Ibadan"
                  className={`w-full px-4 py-2.5 rounded-xl bg-[#FAF6F0] border text-stone-900 text-sm focus:outline-none focus:ring-2 ${
                    errors.eventLocation ? 'border-red-500 focus:ring-red-200' : 'border-stone-300 focus:ring-[#58111A]/20 focus:border-[#58111A]'
                  }`}
                  required
                />
                {errors.eventLocation && <p className="text-xs text-red-600 mt-1">{errors.eventLocation}</p>}
              </div>

              {/* Estimated Guests */}
              <div>
                <label htmlFor="guestCount" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Estimated Guests <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  id="guestCount"
                  name="guestCount"
                  min="1"
                  step="1"
                  value={formData.guestCount}
                  onChange={handleInputChange}
                  placeholder="e.g. 150"
                  className={`w-full px-4 py-2.5 rounded-xl bg-[#FAF6F0] border text-stone-900 text-sm focus:outline-none focus:ring-2 ${
                    errors.guestCount ? 'border-red-500 focus:ring-red-200' : 'border-stone-300 focus:ring-[#58111A]/20 focus:border-[#58111A]'
                  }`}
                  required
                />
                {errors.guestCount && <p className="text-xs text-red-600 mt-1">{errors.guestCount}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Service Required */}
              <div>
                <label htmlFor="serviceRequired" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Catering Service Required <span className="text-red-600">*</span>
                </label>
                <select
                  id="serviceRequired"
                  name="serviceRequired"
                  value={formData.serviceRequired}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 rounded-xl bg-[#FAF6F0] border text-stone-900 text-sm focus:outline-none focus:ring-2 ${
                    errors.serviceRequired ? 'border-red-500 focus:ring-red-200' : 'border-stone-300 focus:ring-[#58111A]/20 focus:border-[#58111A]'
                  }`}
                  required
                >
                  <option value="">Select Service Category</option>
                  <option value="Wedding Catering">Wedding Catering</option>
                  <option value="Birthday & Private Celebrations">Birthday &amp; Private Celebrations</option>
                  <option value="Corporate & Office Catering">Corporate &amp; Office Catering</option>
                  <option value="Party Food & Small Chops">Party Food &amp; Small Chops</option>
                  <option value="Family Gatherings & Dedications">Family Gatherings &amp; Dedications</option>
                  <option value="Food Trays & Delivery Enquiries">Food Trays &amp; Delivery Enquiries</option>
                </select>
                {errors.serviceRequired && <p className="text-xs text-red-600 mt-1">{errors.serviceRequired}</p>}
              </div>

              {/* Estimated Budget (Optional) */}
              <div>
                <label htmlFor="budgetRange" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Estimated Budget Range <span className="text-stone-600 font-normal normal-case">(Optional)</span>
                </label>
                <select
                  id="budgetRange"
                  name="budgetRange"
                  value={formData.budgetRange}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6F0] border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#58111A]/20 focus:border-[#58111A]"
                >
                  <option value="">Select estimated budget</option>
                  <option value="Under ₦250,000">Under ₦250,000</option>
                  <option value="₦250,000 - ₦500,000">₦250,000 - ₦500,000</option>
                  <option value="₦500,000 - ₦1,000,000">₦500,000 - ₦1,000,000</option>
                  <option value="₦1,000,000 - ₦2,500,000">₦1,000,000 - ₦2,500,000</option>
                  <option value="Above ₦2,500,000">Above ₦2,500,000</option>
                  <option value="To be discussed with caterer">To be discussed with caterer</option>
                </select>
              </div>
            </div>

            {/* Food Requests */}
            <div>
              <label htmlFor="foodRequests" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Preferred Menu or Food Requests <span className="text-stone-600 font-normal normal-case">(Optional)</span>
              </label>
              <textarea
                id="foodRequests"
                name="foodRequests"
                rows="2"
                value={formData.foodRequests}
                onChange={handleInputChange}
                placeholder="e.g. Jollof rice, fried rice, chicken, small chops, salad, local swallow..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6F0] border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#58111A]/20 focus:border-[#58111A]"
              ></textarea>
            </div>

            {/* Additional Information */}
            <div>
              <label htmlFor="additionalNotes" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Additional Information or Special Timing <span className="text-stone-600 font-normal normal-case">(Optional)</span>
              </label>
              <textarea
                id="additionalNotes"
                name="additionalNotes"
                rows="2"
                value={formData.additionalNotes}
                onChange={handleInputChange}
                placeholder="Any special requests, serving schedule, or questions regarding delivery..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6F0] border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#58111A]/20 focus:border-[#58111A]"
              ></textarea>
            </div>

            {/* Privacy Acknowledgement Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="privacyAccepted"
                  checked={formData.privacyAccepted}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 rounded border-stone-300 text-[#58111A] focus:ring-[#58111A]"
                  required
                />
                <span className="text-xs text-stone-600 leading-relaxed">
                  I understand this website is a concept preview. My details will be used solely to compile my event enquiry for Precious Catering Services. I have read the{' '}
                  <button
                    type="button"
                    onClick={() => setPrivacyModalOpen(true)}
                    className="text-[#58111A] underline font-semibold"
                  >
                    Privacy Notice
                  </button>.
                </span>
              </label>
              {errors.privacyAccepted && (
                <p className="text-xs text-red-600 mt-1 pl-7">{errors.privacyAccepted}</p>
              )}
            </div>

            {/* Form Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              {/* Primary Direct WhatsApp sender */}
              <button
                type="button"
                onClick={handleContinueWhatsApp}
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20b857] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Continue via WhatsApp</span>
              </button>

              {/* Demo Validate button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#58111A] hover:bg-[#430c13] text-white font-bold text-sm shadow hover:shadow-md transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Checking...</span>
                ) : (
                  <>
                    <span>Validate Form (Demo)</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            <div className="text-center pt-2">
              <p className="text-[11px] text-stone-600">
                Notice: When using "Continue via WhatsApp", your enquiry is prefilled securely into your WhatsApp app. You can review and press Send.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* CONTACT INFORMATION SECTION */}
      <section id="contact" className="py-16 sm:py-24 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs uppercase tracking-widest font-bold text-[#58111A]">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#58111A]">
              Contact Precious Catering Services
            </h2>
            <p className="text-stone-600 text-sm sm:text-base">
              Listed business contact details from public records in Ibadan.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Contact details card */}
            <div className="lg:col-span-5 bg-[#FAF6F0] p-6 sm:p-8 rounded-3xl border border-stone-200/90 shadow-sm space-y-6">
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-bold text-[#58111A]">
                  Precious Catering Services &amp; Event Management
                </h3>
                <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
                  Agbowo, Ibadan, Oyo State
                </p>
              </div>

              {/* Address item */}
              <div className="flex items-start gap-3.5 pt-2">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-[#58111A] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-500 uppercase">Publicly Listed Address</p>
                  <p className="text-sm font-semibold text-stone-900 mt-0.5">
                    No. 20 Ojokondo Street, Agbowo, Ibadan, Oyo State, Nigeria.
                  </p>
                </div>
              </div>

              {/* Telephone item */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-[#58111A] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-500 uppercase">Telephone (Public Directory)</p>
                  <a
                    href={`tel:${rawPhone}`}
                    className="text-base font-bold text-[#58111A] hover:underline mt-0.5 block"
                  >
                    08053067604
                  </a>
                </div>
              </div>

              {/* WhatsApp item */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-500 uppercase">Proposed WhatsApp Contact</p>
                  <a
                    href={defaultWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-bold text-emerald-800 hover:underline mt-0.5 block"
                  >
                    08053067604 (Click to Chat)
                  </a>
                </div>
              </div>

              {/* Notice */}
              <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-stone-600">
                <p>
                  <strong>Owner Verification:</strong> Please confirm physical street number, office opening hours, and official email before publishing live.
                </p>
              </div>

              {/* Call to action buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${rawPhone}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#58111A] text-white text-sm font-bold shadow hover:bg-[#430c13]"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </a>
                <a
                  href={defaultWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#25D366] text-white text-sm font-bold shadow hover:bg-[#20b857]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Embedded Map card for Ibadan location */}
            <div className="lg:col-span-7 bg-[#FAF6F0] rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden flex flex-col">
              <div className="p-5 border-b border-stone-200 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-base">
                    Location in Agbowo, Ibadan
                  </h4>
                  <p className="text-xs text-stone-500">
                    No. 20 Ojokondo Street, Agbowo, Ibadan
                  </p>
                </div>
                <a
                  href="https://maps.google.com/?q=No.+20+Ojokondo+Street+Agbowo+Ibadan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[#58111A] font-bold hover:underline"
                >
                  Open in Maps <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="w-full h-80 bg-stone-200 relative">
                {/* Embed OpenStreetMap iframe for Agbowo, Ibadan area */}
                <iframe
                  title="Precious Catering Services Listed Location - Agbowo, Ibadan"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=3.8900%2C7.4300%2C3.9300%2C7.4600&amp;layer=mapnik&amp;marker=7.4420%2C3.9080"
                  className="w-full h-full border-0"
                  loading="lazy"
                ></iframe>
              </div>
              <div className="p-4 bg-[#FDFBF7] text-xs text-stone-500 border-t border-stone-200">
                Map indicator shows the general Agbowo / University of Ibadan axis. Exact GPS coordinates should be pinned upon owner review.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#2C0B0E] text-stone-300 border-t border-amber-900/30 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
            {/* Brand column */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-400 text-[#58111A] font-serif font-bold text-lg flex items-center justify-center">
                  P
                </div>
                <span className="font-serif text-lg font-bold text-amber-200">
                  Precious Catering
                </span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Precious Catering Services &amp; Event Management. Proposed web concept demo for celebratory and event catering in Agbowo, Ibadan.
              </p>
              <div className="pt-1">
                <span className="text-[11px] text-amber-400/90 font-medium bg-stone-900/80 px-2.5 py-1 rounded-full border border-amber-400/20">
                  Concept Demonstration Only
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-amber-300 mb-4">
                Quick Navigation
              </h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#home" className="hover:text-amber-200 transition-colors">Home</a></li>
                <li><a href="#services" className="hover:text-amber-200 transition-colors">Proposed Services</a></li>
                <li><a href="#gallery" className="hover:text-amber-200 transition-colors">Food &amp; Event Gallery</a></li>
                <li><a href="#about" className="hover:text-amber-200 transition-colors">About Us</a></li>
                <li><a href="#quote-form" className="hover:text-amber-200 transition-colors">Request a Quote</a></li>
                <li><a href="#contact" className="hover:text-amber-200 transition-colors">Contact Details</a></li>
              </ul>
            </div>

            {/* Contact Summary */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-amber-300 mb-4">
                Direct Contact
              </h4>
              <ul className="space-y-2.5 text-xs text-stone-300">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>No. 20 Ojokondo Street, Agbowo, Ibadan, Oyo State, Nigeria.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <a href={`tel:${rawPhone}`} className="hover:text-white">08053067604</a>
                </li>
                <li className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a href={defaultWhatsAppUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    WhatsApp: 08053067604
                  </a>
                </li>
              </ul>
            </div>

            {/* Verification Notice */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-amber-300 mb-4">
                Launch Handoff
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed mb-3">
                No unverified social handles, fake reviews, or prices have been created.
              </p>
              <button
                type="button"
                onClick={() => setOwnerChecklistOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 border border-amber-400/30 text-xs font-semibold transition-colors"
              >
                <FileCheck className="w-4 h-4" />
                View Owner Handoff Checklist
              </button>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
            <p>
              &copy; {new Date().getFullYear()} Precious Catering Services &amp; Event Management. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setPrivacyModalOpen(true)}
                className="hover:text-amber-200 underline underline-offset-4"
              >
                Privacy Notice
              </button>
              <span>•</span>
              <button
                onClick={() => setOwnerChecklistOpen(true)}
                className="hover:text-amber-200 underline underline-offset-4"
              >
                Owner Verification
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON (Fixed Bottom-Right) */}
      <a
        href={defaultWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20b857] text-white p-3.5 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center group focus:outline-none focus:ring-4 focus:ring-emerald-300"
        aria-label="Chat with Precious Catering on WhatsApp"
        title="Chat on WhatsApp (08053067604)"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 text-xs font-bold">
          Chat on WhatsApp
        </span>
      </a>

      {/* PRIVACY POLICY MODAL */}
      {privacyModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Privacy Policy"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setPrivacyModalOpen(false)}
        >
          <div
            className="bg-[#FAF6F0] rounded-2xl max-w-xl w-full p-6 sm:p-8 border border-stone-300 shadow-2xl relative my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPrivacyModalOpen(false)}
              className="absolute top-4 right-4 text-stone-500 hover:text-stone-900"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#58111A]">
                <ShieldCheck className="w-6 h-6" />
                <h3 className="font-serif text-2xl font-bold">Privacy Notice</h3>
              </div>
              <p className="text-xs text-stone-500">
                Website Demonstration Policy • Precious Catering Services &amp; Event Management
              </p>
              <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed max-h-96 overflow-y-auto pr-2">
                <p>
                  <strong>1. What Information Is Collected:</strong> This website's enquiry form requests event planning details including your full name, phone number, optional email address, event type, date, location in Ibadan/Oyo State, estimated guest count, and menu preferences.
                </p>
                <p>
                  <strong>2. Purpose of Collection:</strong> The information is used solely to generate a tailored catering quotation and to enable direct contact between you and Precious Catering Services.
                </p>
                <p>
                  <strong>3. Demo Environment Notice:</strong> In this demonstration preview, enquiry submissions are not saved to a live database or transmitted to third-party marketing servers. The primary method of delivery is direct formatting into WhatsApp (or direct telephone inquiry).
                </p>
                <p>
                  <strong>4. Data Security:</strong> No sensitive financial details, passwords, or credit card numbers are ever requested or collected by this website.
                </p>
                <p>
                  <strong>5. Owner Confirmation:</strong> Before deploying to a live production domain with persistent database storage, the business owner must confirm data handling policies in compliance with applicable Nigerian data protection regulations.
                </p>
              </div>
              <div className="pt-3 border-t border-stone-300 flex justify-end">
                <button
                  type="button"
                  onClick={() => setPrivacyModalOpen(false)}
                  className="px-5 py-2 rounded-lg bg-[#58111A] text-white text-xs font-bold hover:bg-[#430c13]"
                >
                  I Understand
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* OWNER HANDOFF CHECKLIST DRAWER / MODAL */}
      {ownerChecklistOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Owner Handoff Checklist"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setOwnerChecklistOpen(false)}
        >
          <div
            className="bg-[#FAF6F0] rounded-2xl max-w-2xl w-full p-6 sm:p-8 border border-amber-300 shadow-2xl relative my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOwnerChecklistOpen(false)}
              className="absolute top-4 right-4 text-stone-500 hover:text-stone-900"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#58111A]">
                <FileCheck className="w-6 h-6 text-amber-700" />
                <h3 className="font-serif text-2xl font-bold">Owner Handoff &amp; Verification Checklist</h3>
              </div>
              <p className="text-xs text-stone-600">
                Items the business owner of <strong>Precious Catering Services &amp; Event Management</strong> should verify before taking this website live:
              </p>

              <div className="space-y-3 text-xs sm:text-sm text-stone-700 max-h-96 overflow-y-auto pr-2">
                <div className="p-3 rounded-lg bg-[#FDFBF7] border border-stone-200">
                  <p className="font-bold text-[#58111A]">1. Confirm Contact Details &amp; Address</p>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Verify that No. 20 Ojokondo Street, Agbowo, Ibadan is the current physical reception or consultation address, and confirm whether 08053067604 is the designated WhatsApp business line.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[#FDFBF7] border border-stone-200">
                  <p className="font-bold text-[#58111A]">2. Replace Placeholder Photography</p>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Substitute the stock Jollof, small chops, and buffet photos with authentic photos of dishes and setups prepared by Precious Catering.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[#FDFBF7] border border-stone-200">
                  <p className="font-bold text-[#58111A]">3. Approve Service Categories &amp; Delivery Policies</p>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Confirm which service categories (wedding, birthdays, office trays, delivery) are actively offered, plus delivery radii and minimum orders.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[#FDFBF7] border border-stone-200">
                  <p className="font-bold text-[#58111A]">4. Official Business Story &amp; Accreditations</p>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Provide the official business background, founding story, chef credentials, or certifications to replace the placeholder notice in the About section.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[#FDFBF7] border border-stone-200">
                  <p className="font-bold text-[#58111A]">5. Configure Backend Database / Email Notification</p>
                  <p className="text-xs text-stone-600 mt-0.5">
                    If an email inbox is preferred over direct WhatsApp forwarding, connect an endpoint (e.g. Supabase, Firebase, or an authenticated serverless mail API).
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-300 flex justify-end">
                <button
                  type="button"
                  onClick={() => setOwnerChecklistOpen(false)}
                  className="px-5 py-2 rounded-lg bg-[#58111A] text-white text-xs font-bold hover:bg-[#430c13]"
                >
                  Close Checklist
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}