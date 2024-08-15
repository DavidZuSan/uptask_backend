import { Router } from 'express';
import { body,  param } from 'express-validator';
import { ProjectController } from '../controllers/ProjectController';
import { handleInputErrors } from '../middleware/validation';
import { TaskController } from '../controllers/TaskController';
import { validateProjectExist } from '../middleware/project';

const router = Router();

router.post('/',
    body('projectName').notEmpty().withMessage('El nombre del proyecto es obligatorio'),
    body('clientName').notEmpty().withMessage('El nombre del cliente es obligatorio'),
    body('description').notEmpty().withMessage('La descripción del proyecto es obligatoria'),
    handleInputErrors,
    ProjectController.createProject
);
router.get('/', ProjectController.getAllProjects);
router.get('/:id',
    param('id').isMongoId().withMessage('El ID debe ser un ID válido de MongoDB'),
    handleInputErrors,
    ProjectController.getProjectById
);

router.put('/:id',
    param('id').isMongoId().withMessage('El ID debe ser un ID válido de MongoDB'),
    body('projectName').notEmpty().withMessage('El nombre del proyecto es obligatorio'),
    body('clientName').notEmpty().withMessage('El nombre del cliente es obligatorio'),
    body('description').notEmpty().withMessage('La descripción del proyecto es obligatoria'),
    handleInputErrors,
    handleInputErrors,
    ProjectController.updateProject
);

router.delete('/:id',
    param('id').isMongoId().withMessage('El ID debe ser un ID válido de MongoDB'),
    handleInputErrors,
    ProjectController.deleteProject
);

/** Routes for tasks */
router.post('/:projectId/tasks',
    validateProjectExist,
    body('name').notEmpty().withMessage('El nombre de la tarea es obligatorio'),
    body('description').notEmpty().withMessage('La descripción de la tarea es obligatoria'),
    handleInputErrors,
    TaskController.createTask
)

router.get('/:projectId/tasks',
    validateProjectExist,
    TaskController.getProjectTasks
)

router.get('/:projectId/tasks/:id',
    validateProjectExist,
    TaskController.getProjectTasks
)

export default router;