"use client";
import { useState } from 'react';

const EditableLinkList = ({ title, items, setItems, fields }) => {
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
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">{title}</h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="p-3 border bg-white rounded-md grid grid-cols-2 gap-4 items-center">
            {fields.map(field => (
              <div key={field.name}>
                <label className="text-sm font-medium text-gray-600">{field.label}</label>
                <input
                  type="text"
                  value={item[field.name] || ''}
                  onChange={(e) => handleItemChange(index, field.name, e.target.value)}
                  className="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-gray-900 bg-white"
                  placeholder={field.placeholder}
                />
              </div>
            ))}
            <div className="flex justify-end items-end h-full">
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="text-red-500 hover:text-red-700 font-bold px-2 py-1"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addItem}
        className="mt-3 px-3 py-1.5 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
      >
        Add {title.slice(0, -1)}
      </button>
    </div>
  );
};

const SocialMediaLinksEditor = ({ links, setLinks }) => {
  const handleLinkChange = (index, value) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], href: value };
    try {
      const url = new URL(value);
      const hostname = url.hostname.replace('www.', '').split('.')[0];
      newLinks[index].name = hostname;
    } catch (error) {
      // if invalid url, name is empty
      newLinks[index].name = '';
    }
    setLinks(newLinks);
  };

  const addLink = () => {
    setLinks([...links, { name: '', href: '' }]);
  };

  const removeLink = (index) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Social Media Links</h3>
      <div className="space-y-3">
        {links.map((link, index) => (
          <div key={index} className="flex items-center gap-3">
            <input
              type="text"
              value={link.href || ''}
              onChange={(e) => handleLinkChange(index, e.target.value)}
              className="flex-grow px-2 py-1.5 border border-gray-300 rounded-md text-gray-900 bg-white"
              placeholder="https://facebook.com/..."
            />
            <button
              type="button"
              onClick={() => removeLink(index)}
              className="text-red-500 hover:text-red-700 font-bold px-2 py-1"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addLink}
        className="mt-3 px-3 py-1.5 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
      >
        Add Social Media Link
      </button>
    </div>
  );
};

export default function FooterSettingsSection({ content, onSave, saving }) {
  const handleInputChange = (field, value) => {
    onSave({ ...content, [field]: value });
  };

  const handleListChange = (key, newItems) => {
    onSave({ ...content, [key]: newItems });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Footer Settings</h2>
      
      <div className="p-4 border rounded-lg bg-white">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Company Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              value={content?.companyName || ''}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Short Description</label>
            <input
              type="text"
              value={content?.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              value={content?.address || ''}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={content?.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              value={content?.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white"
            />
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700">Copyright Text</label>
            <input
              type="text"
              value={content?.copyright || ''}
              onChange={(e) => handleInputChange('copyright', e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white"
            />
          </div>
        </div>
      </div>

      <EditableLinkList
        title="Quick Links"
        items={content?.quickLinks || []}
        setItems={(items) => handleListChange('quickLinks', items)}
        fields={[
          { name: 'name', label: 'Link Text', placeholder: 'Home' },
          { name: 'href', label: 'URL', placeholder: '/' },
        ]}
      />

      <SocialMediaLinksEditor
        links={content?.socialLinks || []}
        setLinks={(items) => handleListChange('socialLinks', items)}
      />
    </div>
  );
} 