import {body} from 'express-validator'

export const loginValidation = [
  body('email','Неверно указана почта').isEmail(),
  body('password','Ваш пароль должен быть длиннее 5-ти символов').isLength({min:5}),
];

export const registerValidation = [
  body('email','Неверно указана почта').isEmail(),
  body('password','Ваш пароль должен быть длиннее 5-ти символов').isLength({min:5}),
  body('fullName','Ваше имя должно быть длиннее 2-ух букв').isLength({min:2}),
  body('avatarUrl','Неверно указана ссылка на аватар').optional().isURL(),
];

export const postCreateValidation = [
  body('title','Введите заголовок статьи').isLength({min:3}).isString(),
  body('text','Статья должен быть имет текст внутрь').isLength({min:3}).isString(),
  body('tags','Неверный формат тегов').optional().isString(),
  body('imageUrl','Неверно указано изображение').optional().isString(),
];


