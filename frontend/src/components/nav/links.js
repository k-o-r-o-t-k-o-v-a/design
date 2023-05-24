import icon from './../../assets/icons/success.svg';

export const navLinks = [
    {
        name: 'Рабочие пространства',
        icon,
        additionalLink: {
            icon: icon,
            path: '/create',
        },
        nested: [
            {
                name: 'Trello',
                path: '/trello'
            },
            {
                name: 'Моё рабочее пространство',
                path: '/trello'
            },
        ]
    },
    {
        name: 'Участники',
        path: '/participants',
        icon,
    },
    {
        name: 'Календарь',
        path: '/calendar',
        icon,
    },
    {
        name: 'Доски',
        icon,
        additionalLink: {
            icon: icon,
            path: '/create1'
        },
        nested: [
            {
                name: 'Проект X',
                path: '/project-x'
            },
            {
                name: 'Проект Y',
                path: '/project-y'
            }
        ],
    }
];
