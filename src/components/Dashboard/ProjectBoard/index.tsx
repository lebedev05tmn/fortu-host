'use client'
import React, { useRef, useState } from 'react'
import cn from 'classnames'

import styles from "./ProjectBoard.module.scss";
import Image from 'next/image';
import ProjectModal from '../ProjectModal/ProjectModal';
import ProjectRunning from '@/shared/ui/Dashboard/ProjectRunning';
import ProjectError from '@/shared/ui/Dashboard/ProjectError';
import ProjectAdd from '@/shared/ui/Dashboard/ProjectAdd';
import { useQuery } from '@tanstack/react-query';
import { BASE_URL } from '@/shared/config/config';
import axios from 'axios';

const mockProject = [
  {
    type: 'running',
    name: 'text'
  },
  {
    type: 'error',
    name: 'text'
  },
]

const ProjectBoard = () => {
  const [hoverProject, setHoverProject] = useState(false)
  const [openCreateProject, setOpenCreateProject] = useState(false)
  
  const queryGetProjects = useQuery({
    queryKey: ['projects'],
    queryFn: () => {
      return axios.get(`${BASE_URL}/projects`)
    },
    enabled: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })

  console.log(queryGetProjects.data)

  const addProject = () => {
    setOpenCreateProject(true)
  }

  return (
    <>
    {mockProject.length > 0 ? <>
      <div className={styles.project_grid}>
        {mockProject.map((project, idx) => (
          <div key={idx}>
            {project.type == 'running' && <>
              <ProjectRunning name={project.name} />
            </>}
            {project.type == 'error' && <>
              <ProjectError name={project.name} />
            </>}
          </div>
        ))}
        <ProjectAdd onAdd={addProject} />
      </div>
    </> : <>
        <div
          className={cn(styles.project_container, {[styles.project_container_hover]: hoverProject})}
          onMouseEnter={e => setHoverProject(true)}
          onMouseLeave={e => setHoverProject(false)}
          onClick={addProject}
        >
          <div className={styles.app_preview}>
            <div className={styles.preview_img}>
              <Image
                src={!hoverProject ? '/icons/dashboard/add.svg' : '/icons/dashboard/add_light.svg'}
                alt='add project'
                width={!hoverProject ? 60 : 68}
                height={!hoverProject ? 60 : 68}
              />
            </div>
            <div className={styles.prview_desc}>
              <p className={styles.desc_title}>
                Добавьте свой первый проект на python совершенно <span className={cn(styles.title_free, {[styles.title_free_hover]: hoverProject})}>бесплатно!</span>
              </p>
              <p>
                Вы можете загрузить проект из zip-архива, из Github <br /> или создать пустой
              </p>
            </div>
          </div>
        </div>
      </>}
      {openCreateProject && <>
        <ProjectModal onClose={() => setOpenCreateProject(false)} />
      </>}
    </>
  )
}

export default ProjectBoard