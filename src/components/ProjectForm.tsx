'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

interface ProjectFormData {
  title: {
    fr: string;
    en: string;
  };
  description: {
    fr: string;
    en: string;
  };
  image: File | null;
  technologies: string;
  categories: string[];
  link: string;
  uploadedImageUrl?: string;
}

interface ProjectFormProps {
  formData: ProjectFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProjectFormData>>;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  imagePreview: string | null;
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
  isLoading: boolean;
  handleCancel?: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  formData,
  setFormData,
  handleSubmit,
  imagePreview,
  setImagePreview,
  isLoading,
  handleCancel,
}) => {
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, lang: 'fr' | 'en') => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: {
        ...prev[name as keyof Pick<ProjectFormData, 'title' | 'description'>],
        [lang]: value
      }
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, image: file }));

      // Créer un aperçu de l'image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Pour l'instant, on stocke juste l'URL locale
      // Plus tard on pourra implémenter l'upload vers Cloudinary ou Vercel Blob
      setFormData(prev => ({ ...prev, uploadedImageUrl: reader.result as string }));
    }
  };

  const handleTechnologiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, technologies: e.target.value }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const category = e.target.value;
    setFormData(prev => {
      if (prev.categories.includes(category)) {
        return {
          ...prev,
          categories: prev.categories.filter(c => c !== category)
        };
      } else {
        return {
          ...prev,
          categories: [...prev.categories, category]
        };
      }
    });
  };

  const availableCategories = ['frontend', 'backend', 'fullstack', 'modding'];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title-fr" className="block text-sm font-medium text-gray-300 mb-2">
          {t('admin.form.title')} (FR)
        </label>
        <input
          type="text"
          id="title-fr"
          name="title"
          value={formData.title.fr}
          onChange={(e) => handleChange(e, 'fr')}
          required
          className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          placeholder="Mon super projet"
        />
      </div>

      <div>
        <label htmlFor="title-en" className="block text-sm font-medium text-gray-300 mb-2">
          {t('admin.form.title')} (EN)
        </label>
        <input
          type="text"
          id="title-en"
          name="title"
          value={formData.title.en}
          onChange={(e) => handleChange(e, 'en')}
          required
          className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          placeholder="My awesome project"
        />
      </div>

      <div>
        <label htmlFor="description-fr" className="block text-sm font-medium text-gray-300 mb-2">
          {t('admin.form.description')} (FR)
        </label>
        <textarea
          id="description-fr"
          name="description"
          value={formData.description.fr}
          onChange={(e) => handleChange(e, 'fr')}
          required
          rows={4}
          className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white resize-y"
          placeholder="Description détaillée du projet..."
        />
      </div>

      <div>
        <label htmlFor="description-en" className="block text-sm font-medium text-gray-300 mb-2">
          {t('admin.form.description')} (EN)
        </label>
        <textarea
          id="description-en"
          name="description"
          value={formData.description.en}
          onChange={(e) => handleChange(e, 'en')}
          required
          rows={4}
          className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white resize-y"
          placeholder="Detailed project description..."
        />
      </div>

      <div>
        <label htmlFor="technologies" className="block text-sm font-medium text-gray-300 mb-2">
          {t('admin.form.technologies')}
        </label>
        <input
          type="text"
          id="technologies"
          name="technologies"
          value={formData.technologies}
          onChange={handleTechnologiesChange}
          placeholder="React, TypeScript, Symfony..."
          className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        />
        <p className="mt-1 text-sm text-gray-400">
          {t('admin.form.technologiesHelp')}
        </p>
      </div>

      <div>
        <label htmlFor="link" className="block text-sm font-medium text-gray-300 mb-2">
          {t('admin.form.link')}
        </label>
        <input
          type="url"
          id="link"
          name="link"
          value={formData.link}
          onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
          placeholder="https://github.com/username/project"
          className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {t('admin.form.categories')}
        </label>
        <div className="grid grid-cols-2 gap-4">
          {availableCategories.map(category => (
            <label 
              key={category} 
              className={`flex items-center p-3 rounded-lg border transition-colors cursor-pointer ${
                formData.categories.includes(category)
                  ? 'bg-blue-500/20 border-blue-500/50'
                  : 'bg-gray-700/50 border-gray-600 hover:border-gray-500'
              }`}
            >
              <input
                type="checkbox"
                value={category}
                checked={formData.categories.includes(category)}
                onChange={handleCategoryChange}
                className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <span className="ml-3 text-gray-300">{t(`projects.categories.${category}`)}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-2">
          {t('admin.form.image')}
        </label>
        <div className="flex items-center justify-center w-full">
          <label htmlFor="image" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700/30 hover:bg-gray-700/50 transition-all">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p className="mb-2 text-sm text-gray-400">
                <span className="font-semibold">Cliquez pour uploader</span> ou glissez-déposez
              </p>
              <p className="text-xs text-gray-400">PNG, JPG ou WEBP (MAX. 2MB)</p>
            </div>
            <input 
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
        {imagePreview && (
          <div className="mt-4">
            <div className="relative group">
              <Image 
                src={imagePreview} 
                alt="Preview" 
                width={400}
                height={192}
                className="w-full h-48 object-cover rounded-lg border border-gray-600"
                unoptimized
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, image: null }));
                    setImagePreview(null);
                  }}
                  className="text-white bg-red-500/80 hover:bg-red-600/80 px-4 py-2 rounded-lg transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? t('admin.form.saving') : t('admin.form.save')}
        </button>
        {handleCancel && (
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 py-3 px-4 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all"
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  );
};

export default ProjectForm;
