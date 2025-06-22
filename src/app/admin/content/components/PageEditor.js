'use client';

import { useState, useEffect } from 'react';
import ImageUploader from '../../../components/ImageUploader';
import * as HeroIcons from '@heroicons/react/24/outline';
import Select from 'react-select';

const AccordionWrapper = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-lg overflow-hidden mb-4 bg-white shadow">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 text-left font-semibold text-gray-800 bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
      >
        <span>{title}</span>
        <HeroIcons.ChevronDownIcon className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="p-6 border-t">
          {children}
        </div>
      )}
    </div>
  );
};

const iconMap = Object.keys(HeroIcons).reduce((acc, key) => {
  if (key.endsWith('Icon')) {
    acc[key] = HeroIcons[key];
  }
  return acc;
}, {});
const iconNames = Object.keys(iconMap);
const iconOptions = Object.keys(iconMap).map(name => ({
  value: name,
  label: name.replace('Icon', ''),
}));

const IconPicker = ({ value, onChange }) => {
  const CurrentIcon = value && iconMap[value] ? iconMap[value] : null;

  const formatOptionLabel = ({ value, label }) => {
    const Icon = iconMap[value];
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Icon style={{ marginRight: '8px', width: '20px', height: '20px' }} />
        <span>{label}</span>
      </div>
    );
  };
  
  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: '42px',
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 50
    })
  };

  return (
    <div className="flex items-center space-x-2">
      {CurrentIcon && <CurrentIcon className="h-8 w-8 text-gray-600 flex-shrink-0" />}
      <Select
        value={iconOptions.find(option => option.value === value)}
        onChange={(option) => onChange(option.value)}
        options={iconOptions}
        formatOptionLabel={formatOptionLabel}
        styles={customStyles}
        className="w-full text-gray-900"
        placeholder="Search or select an icon..."
      />
    </div>
  );
};

// A reusable component to edit a list of items
const EditableList = ({ title, items, setItems, fields }) => {
  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => {
    const newItem = fields.reduce((acc, field) => {
      acc[field.name] = '';
      return acc;
    }, {});
    setItems([...items, newItem]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-inner mt-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-900 text-gray-800">{title}</h3>
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="p-4 border bg-white rounded-md relative shadow-sm">
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold"
            >
              &times;
            </button>
            {fields.map(field => {
               const inputId = `item-${index}-${field.name}`;
               return(
                <div key={field.name} className="mb-4">
                  <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">{field.label}</label>
                  {field.type === 'icon' ? (
                    <IconPicker value={item[field.name]} onChange={(val) => handleItemChange(index, field.name, val)} />
                  ) : field.type === 'textarea' ? (
                    <textarea
                      id={inputId}
                      value={item[field.name] || ''}
                      onChange={(e) => handleItemChange(index, field.name, e.target.value)}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-900 bg-white"
                      rows="3"
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  ) : field.type === 'select' ? (
                    <select
                      id={inputId}
                      value={item[field.name] || ''}
                      onChange={(e) => handleItemChange(index, field.name, e.target.value)}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-900 bg-white"
                    >
                      <option value="">-- Select {field.label} --</option>
                      {field.options.map(optionValue => (
                        <option key={optionValue} value={optionValue}>{optionValue}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={inputId}
                      type="text"
                      value={item[field.name] || ''}
                      onChange={(e) => handleItemChange(index, field.name, e.target.value)}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-900 bg-white"
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  )}
                </div>
               )
            })}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addItem}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Add New {title.slice(0, -1)}
      </button>
    </div>
  );
};

const TeamMemberList = ({ items, setItems }) => {
  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { name: '', position: '', bio: '', image: '', links: [] }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleLinkChange = (memberIndex, linkIndex, value) => {
    const newItems = [...items];
    newItems[memberIndex].links[linkIndex] = value;
    setItems(newItems);
  };

  const addLink = (memberIndex) => {
    const newItems = [...items];
    if (!newItems[memberIndex].links) {
      newItems[memberIndex].links = [];
    }
    if (newItems[memberIndex].links.length < 3) {
      newItems[memberIndex].links.push('');
      setItems(newItems);
    }
  };

  const removeLink = (memberIndex, linkIndex) => {
    const newItems = [...items];
    newItems[memberIndex].links.splice(linkIndex, 1);
    setItems(newItems);
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-inner mt-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-900 text-gray-800">Team Members</h3>
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="p-4 border bg-white rounded-md relative shadow-sm">
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold"
            >
              &times;
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <input type="text" placeholder="Name" value={item.name} onChange={(e) => handleItemChange(index, 'name', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 bg-white" />
                <input type="text" placeholder="Position" value={item.position} onChange={(e) => handleItemChange(index, 'position', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 bg-white" />
                <textarea placeholder="Bio" value={item.bio} onChange={(e) => handleItemChange(index, 'bio', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 bg-white" rows="3"></textarea>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Social Links (up to 3)</h4>
                  <div className="space-y-2">
                    {(item.links || []).map((link, linkIndex) => (
                      <div key={linkIndex} className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="e.g., https://www.linkedin.com/in/..."
                          value={link}
                          onChange={(e) => handleLinkChange(index, linkIndex, e.target.value)}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 bg-white"
                        />
                        <button type="button" onClick={() => removeLink(index, linkIndex)} className="text-red-500 hover:text-red-700 p-1 rounded-full">&times;</button>
                      </div>
                    ))}
                    {(item.links || []).length < 3 && (
                      <button
                        type="button"
                        onClick={() => addLink(index)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        + Add Link
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <ImageUploader 
                  onUpload={(url) => handleItemChange(index, 'image', url)} 
                  initialUrls={item.image ? [item.image] : []}
                  label="Member Photo"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addItem}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Add New Member
      </button>
    </div>
  );
};

export default function PageEditor({ pageData: initialData, onSave, onCancel }) {
  const [pageData, setPageData] = useState(initialData);

  useEffect(() => {
    setPageData(initialData);
  }, [initialData]);

  if (!pageData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Select a page to start editing.</p>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPageData(prev => ({ ...prev, [name]: value }));
  };

  const handleHeroChange = (e) => {
    const { name, value } = e.target;
    setPageData(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        [name]: value,
      }
    }));
  };

  const handleHeroImageUpload = (url) => {
    setPageData(prev => ({
      ...prev,
      hero: { ...prev.hero, image: url }
    }));
  };
  
  const handleListChange = (key, newItems) => {
    setPageData(prev => ({ ...prev, [key]: newItems }));
  };

  return (
    <div className="space-y-8">
      <AccordionWrapper title="Hero Section">
        <div className="space-y-4">
          <div>
            <label htmlFor="hero-title" className="block text-sm font-medium text-gray-700">Hero Title</label>
            <input
              type="text"
              name="title"
              id="hero-title"
              value={pageData.hero?.title || ''}
              onChange={handleHeroChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-900 bg-white"
              placeholder="e.g. Discover the Land of the Thunder Dragon"
            />
          </div>
          <div>
            <label htmlFor="hero-subtitle" className="block text-sm font-medium text-gray-700">Hero Subtitle</label>
            <input
              type="text"
              name="subtitle"
              id="hero-subtitle"
              value={pageData.hero?.subtitle || ''}
              onChange={handleHeroChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-900"
              placeholder="e.g. Unforgettable journeys in Bhutan"
            />
          </div>
          <div>
            <ImageUploader 
              onUpload={handleHeroImageUpload}
              initialUrls={pageData.hero?.image ? [pageData.hero.image] : []}
              label="Hero Image"
            />
          </div>
        </div>
      </AccordionWrapper>

      <AccordionWrapper title="Intro Section">
        <div className="space-y-4">
          <div>
            <label htmlFor="intro-title" className="block text-sm font-medium text-gray-700">Intro Title</label>
            <input
              type="text"
              name="title"
              id="intro-title"
              value={pageData.title || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-900 bg-white"
              placeholder="e.g. Welcome to Our Website"
            />
          </div>
          <div>
            <label htmlFor="intro-content" className="block text-sm font-medium text-gray-700">Intro Content</label>
            <textarea
              name="content"
              id="intro-content"
              rows="5"
              value={pageData.content || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-900 bg-white"
              placeholder="A brief introduction about the page content."
            ></textarea>
          </div>
        </div>
      </AccordionWrapper>

      {pageData.sectionId === 'about-us' && (
        <>
          <AccordionWrapper title="Our Core Values">
            <EditableList
              title="Our Core Values"
              items={pageData.values || []}
              setItems={(newItems) => handleListChange('values', newItems)}
              fields={[
                { name: 'icon', label: 'Icon', type: 'icon' },
                { name: 'title', label: 'Title' },
                { name: 'description', label: 'Description', type: 'textarea' },
              ]}
            />
          </AccordionWrapper>
          <AccordionWrapper title="Team Members">
            <TeamMemberList
              items={pageData.teamMembers || []}
              setItems={(newItems) => handleListChange('teamMembers', newItems)}
            />
          </AccordionWrapper>
        </>
      )}

      {pageData.sectionId === 'why-us' && (
        <AccordionWrapper title="Reasons to Choose Us">
          <EditableList
            title="Reasons"
            items={pageData.reasons || []}
            setItems={(newItems) => handleListChange('reasons', newItems)}
            fields={[
              { name: 'icon', label: 'Icon', type: 'icon' },
              { name: 'title', label: 'Title' },
              { name: 'description', label: 'Description', type: 'textarea' },
            ]}
          />
        </AccordionWrapper>
      )}

      {pageData.sectionId === 'travel-info' && (
        <>
          <AccordionWrapper title="Key Information">
            <EditableList
              title="Key Info Items"
              items={pageData.items || []}
              setItems={(newItems) => handleListChange('items', newItems)}
              fields={[
                { name: 'icon', label: 'Icon', type: 'icon' },
                { name: 'title', label: 'Title' },
                { name: 'description', label: 'Description', type: 'textarea' },
              ]}
            />
          </AccordionWrapper>
          <AccordionWrapper title="Frequently Asked Questions">
            <EditableList
              title="FAQs"
              items={pageData.faqs || []}
              setItems={(newItems) => handleListChange('faqs', newItems)}
              fields={[
                { name: 'title', label: 'Question' },
                { name: 'content', label: 'Answer', type: 'textarea' },
              ]}
            />
          </AccordionWrapper>
        </>
      )}

      <div className="flex justify-end space-x-4 pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => onSave(pageData)}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
} 