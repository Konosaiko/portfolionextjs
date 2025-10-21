'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ProjectForm from '@/components/ProjectForm';
import { useAvailability } from '@/contexts/AvailabilityContext';

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

interface Project {
  id: number;
  title: {
    fr: string;
    en: string;
  };
  description: {
    fr: string;
    en: string;
  };
  image: string;
  technologies: string[];
  categories: string[];
  link?: string;
}

const AdminPage = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language as 'fr' | 'en';
  const { availability, setAvailability, refreshAvailability } = useAvailability();
  const [projects, setProjects] = useState<Project[]>([]);
  const [formData, setFormData] = useState<ProjectFormData>({
    title: { fr: '', en: '' },
    description: { fr: '', en: '' },
    image: null,
    technologies: '',
    categories: [],
    link: '',
    uploadedImageUrl: undefined
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      if (!response.ok) throw new Error('Failed to fetch projects');
      const data = await response.json();
      
      setProjects(data.member || []);
    } catch (error) {
      console.error('Fetch error:', error);
      setMessage({ type: 'error', text: t('admin.errors.fetch') });
      setProjects([]);
    }
  };

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateAvailability = async (newStatus: 'available' | 'partially' | 'unavailable') => {
    try {
      const response = await fetch('/api/availability', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const data = await response.json();
        setAvailability(data);
        setMessage({ type: 'success', text: t('admin.availability.updateSuccess') });
        await refreshAvailability();
      } else {
        setMessage({ type: 'error', text: t('admin.availability.updateError') });
      }
    } catch (error) {
      console.error('Error updating availability:', error);
      setMessage({ type: 'error', text: t('admin.availability.updateError') });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const projectData = {
        title: formData.title,
        description: formData.description,
        technologies: formData.technologies.split(',').map(tech => tech.trim()),
        categories: formData.categories,
        link: formData.link,
        image: formData.uploadedImageUrl || imagePreview
      };

      console.log('Sending project data:', projectData);

      const url = editingProject 
        ? `/api/projects/${editingProject.id}`
        : '/api/projects';
      const method = editingProject ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save project');
      }

      setMessage({ type: 'success', text: t('admin.success.save') });
      resetForm();
      fetchProjects();
    } catch (error) {
      console.error('Error:', error);
      setMessage({ type: 'error', text: error instanceof Error ? error.message : t('admin.errors.save') });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    console.log('Editing project:', project);
    setEditingProject(project);
    setFormData({
      title: {
        fr: project.title.fr,
        en: project.title.en
      },
      description: {
        fr: project.description.fr,
        en: project.description.en
      },
      image: null,
      technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : '',
      categories: project.categories || [],
      link: project.link || '',
      uploadedImageUrl: project.image
    });
    if (project.image) {
      setImagePreview(project.image);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm(t('admin.confirm.delete'))) return;

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete project');

      setMessage({ type: 'success', text: t('admin.success.delete') });
      fetchProjects();
    } catch {
      setMessage({ type: 'error', text: t('admin.errors.delete') });
    }
  };

  const handleCancel = () => {
    resetForm();
    setEditingProject(null);
  };

  const resetForm = () => {
    setFormData({
      title: { fr: '', en: '' },
      description: { fr: '', en: '' },
      image: null,
      technologies: '',
      categories: [],
      link: '',
      uploadedImageUrl: undefined
    });
    setImagePreview(null);
    setEditingProject(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Administration
        </h1>

        {message && (
          <div className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-500/20 border border-green-500' : 'bg-red-500/20 border border-red-500'
          }`}>
            <p className="text-center text-sm sm:text-base">{message.text}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
          {/* Projets */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-gray-700/50">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">Projets</h2>
            <div className="space-y-3 sm:space-y-4 max-h-80 sm:max-h-96 overflow-y-auto">
              {projects.map((project) => (
                <div key={project.id} className="bg-gray-700/50 rounded-lg p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-white text-sm sm:text-base">
                        {project.title[currentLanguage] || project.title.en}
                      </h3>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2">
                        {project.categories.map((category, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 sm:py-1 bg-gray-600/50 rounded-full text-xs text-gray-300"
                          >
                            {t(`projects.categories.${category}`)}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 self-start sm:flex-shrink-0">
                      <button
                        onClick={() => handleEdit(project)}
                        className="bg-blue-500/80 text-white px-2 sm:px-3 py-1 rounded hover:bg-blue-600/80 transition-colors text-xs sm:text-sm"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="bg-red-500/80 text-white px-2 sm:px-3 py-1 rounded hover:bg-red-600/80 transition-colors text-xs sm:text-sm"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formulaire */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-gray-700/50">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">
              {editingProject ? 'Modifier le projet' : 'Ajouter un projet'}
            </h2>
            <ProjectForm
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
              handleCancel={handleCancel}
            />
          </div>
        </div>

        {/* Disponibilité */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-gray-700/50 max-w-full sm:max-w-md">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">Disponibilité</h2>
          <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-2">
            <button
              onClick={() => updateAvailability('available')}
              className={`px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                availability?.status === 'available'
                  ? 'bg-green-500/80 text-white'
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
              }`}
            >
              Disponible
            </button>
            <button
              onClick={() => updateAvailability('partially')}
              className={`px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                availability?.status === 'partially'
                  ? 'bg-yellow-500/80 text-white'
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
              }`}
            >
              Partiellement
            </button>
            <button
              onClick={() => updateAvailability('unavailable')}
              className={`px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                availability?.status === 'unavailable'
                  ? 'bg-red-500/80 text-white'
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
              }`}
            >
              Indisponible
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
