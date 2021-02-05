import {Request, Response} from 'express';
import {IAccount} from '../models/accounts';
import repository from '../models/accountRepository';
import auth from '../auth';

const accounts : IAccount[] = [];

async function getAccounts(req: Request, res: Response, next: any){
  const accounts = await repository.findAll();
  res.json(accounts.map(item => {
    item.password = '';
    return item;
  }));
}

async function getAccount(req: Request, res: Response, next: any){
  try {
    const id = parseInt(req.params.id);
    if(!id) return res.status(400).end();

    const account = await repository.findById(id);
    if (account === null)
      return res.status(404).end();
    else {
      account.password = '';
      res.json(account);
    }
  }
  catch(error) {
    console.log(`getAccount: ${error}`);
    res.status(400).end();
  }
}

async function addAccount(req: Request, res: Response, next: any){
  try {
    const newAccount = req.body as IAccount;
    newAccount.password = auth.hashPassword(newAccount.password);
    const result = await repository.add(newAccount);
    newAccount.password = '';
    newAccount.id = result.id;
    res.status(201).json(newAccount);
  }
  catch(error) {
    console.log(`addAccount: ${error}`);
    res.status(400).end();
  }
}

async function setAccount(req: Request, res: Response, next: any){
  try {
    const accountId = parseInt(req.params.id);
    if(!accountId) return res.status(400).end();

    const accountParams = req.body as IAccount;

    if(accountParams.password)
       accountParams.password = auth.hashPassword(accountParams.password);
    
    const updatedAccount = await repository.set(accountId, accountParams);
    if(updatedAccount !== null){
       updatedAccount.password = '';
       res.status(200).json(updatedAccount);
    }
    else 
       res.status(404).end();
  }
  catch(error) {
    console.log(`setAccount: ${error}`);
    res.status(400).end();
  }
}

async function loginAccount(req: Request, res: Response, next: any){
  try {
    const loginParams = req.body as IAccount;
    const account = await repository.findByEmail(loginParams.email);
    if (account !== null) {
      const isValid = auth.comparePassword(loginParams.password, account.password);
      if (isValid) {
        const token = await auth.sign(account.id!);
        return res.json({ auth: true, token });
      }  
    }

    return res.status(401).end();
  }
  catch (error) {
    console.log(`loginAccount: ${error}`);
    res.status(400).end();
  }
}

function logoutAccount(req: Request, res: Response, next: any){
  res.json({auth: false, token: null});
}

export default { getAccounts, getAccount, addAccount, setAccount, loginAccount, logoutAccount }

