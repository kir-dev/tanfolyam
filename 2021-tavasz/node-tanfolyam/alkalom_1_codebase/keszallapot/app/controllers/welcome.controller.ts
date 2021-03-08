import { Router, Request, Response } from 'express';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.render('welcome/index', {
    name: 'World'
  })
});

router.get('/hello/:name', (req: Request, res: Response) => {
  res.render('welcome/index', {
    name: req.params.name
  })
});

export const WelcomeController: Router = router;
