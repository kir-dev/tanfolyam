import { Request, Response } from 'express'


export const renderMW = (template: string, options?: any) => {
  return (req: Request, res: Response) => {
    return res.render(template, options)
  }
}

export const jsonMW = (object: any) => {
  return (req: Request, res: Response) => {
    return res.json(object)
  }
}

export const redirectMW = (path: string, status?: number) => {
  return (req: Request, res: Response) => {
    return res.redirect(path, status)
  }
}