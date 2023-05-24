export const useValidation = () => {

    const validationNotEmpty = (value, field = 'поле') => {
        if (value === '')
            return `Укажите ${field}`;

        return true;
    }

    const validationUsername = (username) => {
        if (username.length < 4)
            return 'Имя пользователя не может быть короче 4 символов';

        if (username.length > 50)
            return 'Имя пользователя не может быть длиннее 50 символов';

        const regex = /^[a-zA-Z0-9_]{3,20}$/;
        if (!regex.test(username))
            return 'Имя пользователя может включать латинские буквы, цифры и подчёркивание';

        return true;
    }

    const validationPassword = (password) => {
        if (password.length < 8)
            return 'Пароль не может быть короче 8 символов';

        if (password.length > 254)
            return 'Пароль не может быть длиннее 254 символов';

        const regex = /^[a-zA-Z0-9_!@#$%^&]*$/;
        if (!regex.test(password))
            return 'Пароль может включать латинские буквы, цифры и специальные символы';

        return true;
    }

    const validationPhone = (phone) => {
        const cleanedPhoneNumber = phone.replace(/\D/g, '');

        if (!/^\d+$/.test(cleanedPhoneNumber) || cleanedPhoneNumber.length !== 11)
            return 'Номер телефона может состоять только из 11 цифр';

        if (
            !/^(\+7|8)/.test(cleanedPhoneNumber) ||
            !/^(\+7|8)\d{1,2}\d{3}/.test(cleanedPhoneNumber) ||
            !/^(\+7|8)\d{10}$/.test(cleanedPhoneNumber)
        )
            return 'Номер телефона должен быть настоящим'

        return true;
    }

    const validationEmail = (email) => {
        if (email.length > 254)
            return false;

        const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegExp.test(email))
            return false;

        return true;
    }

    return {
        validationNotEmpty,
        validationUsername,
        validationPassword,
        validationPhone,
        validationEmail
    }
}
