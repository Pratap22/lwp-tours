"use client";
import { useState, useEffect, memo, useMemo } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import StickyFooter from "../components/StickyFooter";

// Import all section components
import GallerySection from "./components/GallerySection";
import AwardsSection from "./components/AwardsSection";
import AboutBhutanSection from "./components/AboutBhutanSection";
import CustomJourneySection from "./components/CustomJourneySection";
import TravelThemesSection from "./components/TravelThemesSection";
import WhyChooseUsSection from "./components/WhyChooseUsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import BookingProcessSection from "./components/BookingProcessSection";
import SmallGroupToursSection from "./components/SmallGroupToursSection";
import NavigationSection from "./components/NavigationSection";
import SiteSettingsSection from "./components/SiteSettingsSection";
import FooterSettingsSection from "./components/FooterSettingsSection";

const HomepageHeader = memo(() => (
  <div className="bg-white shadow-sm border-b border-gray-200">
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center py-6 px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Homepage Content
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your website homepage content and sections
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  </div>
));
HomepageHeader.displayName = "HomepageHeader";

const HomepageSidebar = memo(
  ({ sections, activeTab, onTabClick, onMoveSection, tabs }) => {
    const siteSettingsTab = tabs.find((t) => t.id === "siteSettings");
    const navigationTab = tabs.find((t) => t.id === "navigation");
    const footerTabs = tabs.find((t) => t.id === "footer");

    return (
      <div className="lg:col-span-3 sticky top-8 h-fit">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Website Settings
            </h2>
            <div className="space-y-2 mb-6">
              {[siteSettingsTab, navigationTab, footerTabs].map((tab) => {
                if (!tab) return null;
                const isActive = activeTab === tab.id;
                return (
                  <div
                    key={tab.id}
                    onClick={() => onTabClick(tab.id)}
                    className={`group flex items-center gap-3 p-3 rounded-md cursor-pointer transition-all duration-200 ${isActive ? "bg-blue-50 border-l-4 border-blue-500" : "hover:bg-gray-100"}`}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <span
                      className={`font-medium ${isActive ? "text-blue-600" : "text-gray-700"}`}
                    >
                      {tab.name}
                    </span>
                  </div>
                );
              })}
            </div>

            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Homepage Sections
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Drag to reorder • Click to edit
            </p>

            <div className="space-y-2">
              {sections.map((section, index) => {
                const tab = tabs.find((t) => t.id === section.sectionId);
                const isActive = activeTab === section.sectionId;
                const isSectionActive = section?.isActive !== false;

                return (
                  <div
                    key={section.sectionId}
                    draggable
                    onDragStart={(e) =>
                      e.dataTransfer.setData("text/plain", index)
                    }
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const fromIndex = e.dataTransfer.getData("text/plain");
                      onMoveSection(Number(fromIndex), index);
                    }}
                    onClick={() => onTabClick(section.sectionId)}
                    className={`group flex items-center justify-between p-3 rounded-md cursor-pointer transition-all duration-200 ${isActive ? "bg-blue-50 border-l-4 border-blue-500" : "hover:bg-gray-100"} ${isSectionActive ? "" : "opacity-50"}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{tab?.icon || "📄"}</span>
                      <span
                        className={`font-medium ${isActive ? "text-blue-600" : "text-gray-700"}`}
                      >
                        {tab?.name || section.sectionId}
                      </span>
                    </div>
                    <span className="text-gray-400 group-hover:text-gray-600">
                      ☰
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
HomepageSidebar.displayName = "HomepageSidebar";

const SectionEditor = memo(
  ({ activeTab, content, onSave, saving, onContentChange }) => {
    const getSectionById = (sectionId) => {
      if (!content || !content.sections) return null;
      return content.sections.find(
        (section) => section.sectionId === sectionId
      );
    };

    const sectionProps = {
      content: getSectionById(activeTab),
      onSave: (data) => onSave(activeTab, data),
      saving,
      showSaveButton: false, // Hide individual save buttons
    };

    const siteSettingsProps = {
      content: { siteName: content?.siteName, siteLogo: content?.siteLogo },
      onDataChange: (newData) => {
        onContentChange((prev) => ({ ...prev, ...newData }));
      },
      saving,
    };

    const navigationProps = {
      content: content?.sections?.find(
        (sec) => sec.sectionId === "navigation"
      ) || { isActive: true, navigationItems: [] },
      onDataChange: (newData) => {
        const updatedSections = content.sections.map((sec) =>
          sec.sectionId === "navigation" ? newData : sec
        );
        // If navigation section doesn't exist, add it
        if (!updatedSections.some((sec) => sec.sectionId === "navigation")) {
          updatedSections.push({ sectionId: "navigation", ...newData });
        }
        onContentChange((prev) => ({ ...prev, sections: updatedSections }));
      },
      saving,
    };

    const handleFooterSave = (footerData) => {
      onContentChange((prevContent) => ({
        ...prevContent,
        footer: footerData,
      }));
    };

    const sectionMap = {
      gallery: <GallerySection {...sectionProps} />,
      awards: <AwardsSection {...sectionProps} />,
      aboutBhutan: <AboutBhutanSection {...sectionProps} />,
      customJourney: <CustomJourneySection {...sectionProps} />,
      travelThemes: <TravelThemesSection {...sectionProps} />,
      whyChooseUs: <WhyChooseUsSection {...sectionProps} />,
      testimonials: <TestimonialsSection {...sectionProps} />,
      bookingProcess: <BookingProcessSection {...sectionProps} />,
      smallGroupTours: <SmallGroupToursSection {...sectionProps} />,
      navigation: <NavigationSection {...navigationProps} />,
      siteSettings: <SiteSettingsSection {...siteSettingsProps} />,
      footer: (
        <FooterSettingsSection
          content={content?.footer}
          onSave={handleFooterSave}
          saving={saving}
        />
      ),
    };

    return (
      <div className="lg:col-span-9">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-8">{sectionMap[activeTab] || null}</div>
        </div>
      </div>
    );
  }
);
SectionEditor.displayName = "SectionEditor";

export default function ContentManagement() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("gallery");
  const [pendingChanges, setPendingChanges] = useState({});

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const section = searchParams.get("section");
    const initialSection = section || "gallery";
    if (initialSection !== activeTab) {
      setActiveTab(initialSection);
    }
  }, [searchParams, activeTab]);

  useEffect(() => {
    fetchContent();
  }, []);

  const handleTabClick = (tabId) => {
    console.log(tabId)
    setActiveTab(tabId);
    router.push(`/admin/content?section=${tabId}`, { scroll: false });
  };

  const fetchContent = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/content");
      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error("Error fetching content:", error);
      toast.error("Error loading content");
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async (sectionId, data) => {
    setSaving(true);
    try {
      let body;
      if (sectionId === "siteSettings") {
        body = JSON.stringify({
          ...content,
          siteName: data.siteName,
          siteLogo: data.siteLogo,
        });
      } else {
        const updatedSections = content.sections.map((sec) =>
          sec.sectionId === sectionId ? { ...sec, ...data } : sec
        );
        body = JSON.stringify({ ...content, sections: updatedSections });
      }

      const response = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body,
      });

      if (response.ok) {
        const updatedContent = await response.json();
        setContent(updatedContent);
        setPendingChanges({});
        toast.success("Content saved successfully!");
      } else {
        throw new Error("Failed to save content");
      }
    } catch (error) {
      console.error("Error saving content:", error);
      toast.error("Error saving content");
    } finally {
      setSaving(false);
    }
  };

  const handleSave = () => {
    // The data for the active tab is now always in the main `content` state
    if (activeTab === "siteSettings") {
      saveContent(activeTab, {
        siteName: content.siteName,
        siteLogo: content.siteLogo,
      });
    } else if (activeTab === "footer"){
      saveContent(activeTab, {
        footer: content.footer,
      });
    } else {
      const currentSectionData = content.sections.find(
        (sec) => sec.sectionId === activeTab
      );
      if (currentSectionData) {
        // For navigation, ensure we also handle the "Get Started" -> "Contact Us" change
        if (activeTab === "navigation") {
          const updatedNavItems = currentSectionData.navigationItems.map(
            (item) =>
              item.name === "Get Started"
                ? { ...item, name: "Contact Us" }
                : item
          );
          saveContent(activeTab, {
            ...currentSectionData,
            navigationItems: updatedNavItems,
          });
        } else {
          saveContent(activeTab, currentSectionData);
        }
      } else {
        toast.error("Could not find data to save for the current section.");
      }
    }
  };

  const handleCancel = () => {
    router.push("/admin");
  };

  const moveSection = (fromIndex, toIndex) => {
    if (!content || !content.sections) return;

    let homeSections = getSortedSections();
    const [movedSection] = homeSections.splice(fromIndex, 1);
    homeSections.splice(toIndex, 0, movedSection);

    const updatedHomeSections = homeSections.map((section, index) => ({
      ...section,
      order: index + 1,
    }));

    const staticPageSections = content.sections.filter((sec) =>
      ["about-us", "why-us", "travel-info"].includes(sec.sectionId)
    );
    const finalSections = [...updatedHomeSections, ...staticPageSections];

    setContent({
      ...content,
      sections: finalSections,
    });

    saveContentOrder(finalSections);
  };

  const saveContentOrder = async (updatedSections) => {
    setSaving(true);
    try {
      const response = await fetch("/api/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...content,
          sections: updatedSections,
        }),
      });

      if (response.ok) {
        const updatedContent = await response.json();
        setContent(updatedContent);
        toast.success("Sections reordered successfully!");
      } else {
        throw new Error("Failed to reorder sections");
      }
    } catch (error) {
      console.error("Error reordering sections:", error);
      toast.error("Error reordering sections");
    } finally {
      setSaving(false);
    }
  };

  const getSortedSections = () => {
    if (!content || !content.sections) return [];
    const homeSections = content.sections.filter(
      (sec) =>
        ![
          "about-us",
          "why-us",
          "travel-info",
          "navigation",
          "siteSettings",
        ].includes(sec.sectionId)
    );
    return [...homeSections].sort((a, b) => a.order - b.order);
  };

  const homepageSections = useMemo(
    () => [
      { id: "hero", name: "Hero Section", icon: "🌟" },
      { id: "gallery", name: "Gallery", icon: "📷" },
      { id: "awards", name: "Awards", icon: "🏆" },
      { id: "aboutBhutan", name: "About Bhutan", icon: "📖" },
      { id: "customJourney", name: "Custom Journey", icon: "🗺️" },
      { id: "travelThemes", name: "Travel Themes", icon: "🎯" },
      { id: "whyChooseUs", name: "Why Choose Us", icon: "💎" },
      { id: "testimonials", name: "Testimonials", icon: "💬" },
      { id: "bookingProcess", name: "Booking Process", icon: "📋" },
      { id: "smallGroupTours", name: "Small Group Tours", icon: "👥" },
      { id: "cta", name: "Call to Action", icon: "📢" },
    ],
    []
  );

  const websiteSettingsSections = useMemo(
    () => [
      { id: "siteSettings", name: "Site Settings", icon: "⚙️" },
      { id: "navigation", name: "Navigation", icon: "🗺️" },
      { id: "footer", name: "Footer", icon: "📄" },
    ],
    []
  );

  const tabs = useMemo(
    () => [...websiteSettingsSections, ...homepageSections],
    [websiteSettingsSections, homepageSections]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  const sortedSections = getSortedSections();

  return (
    <div className="min-h-screen bg-gray-50">
      <HomepageHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <HomepageSidebar
            sections={sortedSections}
            activeTab={activeTab}
            onTabClick={handleTabClick}
            onMoveSection={moveSection}
            tabs={tabs}
          />

          <SectionEditor
            activeTab={activeTab}
            content={content}
            onSave={saveContent}
            saving={saving}
            onContentChange={setContent}
          />
        </div>
      </div>

      {/* Sticky Footer */}
      <StickyFooter
        onSave={handleSave}
        onCancel={handleCancel}
        saving={saving}
      />
    </div>
  );
}
