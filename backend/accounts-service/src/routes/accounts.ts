import {Router, Request, Response} from 'express';
import Joi from 'joi';
import accountsController from '../controllers/accounts';
import {accountSchema, loginSchema} from '../models/accounts'

function validateSchema(schema: Joi.ObjectSchema<any>, req: Request, res: Response, next: any){
  const {error} = schema.validate(req.body);
  if(error == null) return next();

  const {details} = error;
  const message = details.map(item => item.message).join('.');

  console.log(message);
  res.status(422).end();
}

function validateAccount(req: Request, res: Response, next: any){
  return validateSchema(accountSchema, req, res, next);
}

function validateLogin(req: Request, res: Response, next: any){
  return validateSchema(loginSchema, req, res, next);
}



const router = Router();

router.get('/accounts/', accountsController.getAccounts);

router.get('/accounts/:id', accountsController.getAccount);

router.patch('/accounts/:id', validateAccount, accountsController.setAccount);

router.post('/accounts/', validateAccount, accountsController.addAccount);

router.post('/accounts/login', validateLogin, accountsController.loginAccount);

router.post('/accounts/logout', accountsController.logoutAccount);

export default router;