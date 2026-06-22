let peopleDB = [];


function safePrompt(message, defaultValue = '') {
    let result = prompt(message, defaultValue);
    if (result === null) {
        throw new Error('Отмена ввода');
    }
    return result.trim();
}

function safeNumberPrompt(message, defaultValue = '') {
    let result = prompt(message, defaultValue);
    if (result === null) {
        throw new Error('Отмена ввода');
    }
    let num = parseFloat(result.trim());
    if (isNaN(num)) {
        throw new Error('Некорректное число');
    }
    return num;
}

function createPersonObject(data) {
    return {
        lastName: data.lastName || '',
        firstName: data.firstName || '',
        middleName: data.middleName || '',
        gender: data.gender || '',
        nationality: data.nationality || '',
        height: data.height || 0,
        weight: data.weight || 0,
        birthDay: data.birthDay || 1,
        birthMonth: data.birthMonth || 1,
        birthYear: data.birthYear || 2000,
        phone: data.phone || '',
        country: data.country || '',
        region: data.region || '',
        district: data.district || '',
        city: data.city || '',
        street: data.street || '',
        house: data.house || '',
        apartment: data.apartment || '',
        id: data.id || ''
    };
}

function inputPersonData(personNumber = '') {
    try {
        console.log(`\n${personNumber ? 'Ввод человека ' + personNumber : 'Ввод нового человека:'}`);

        let lastName = safePrompt("Фамилия:");
        let firstName = safePrompt("Имя:");
        let middleName = safePrompt("Отчество:");
        let gender = safePrompt("Пол (м/ж):");
        let nationality = safePrompt("Национальность:");
        let height = safeNumberPrompt("Рост (в см):");
        let weight = safeNumberPrompt("Вес (в кг):");

        let birthDay = safeNumberPrompt("День рождения (1-31):");
        let birthMonth = safeNumberPrompt("Месяц рождения (1-12):");
        let birthYear = safeNumberPrompt("Год рождения:");

        let phone = safePrompt("Номер телефона:");

        console.log("Введите адрес:");
        let country = safePrompt("Страна:");
        let region = safePrompt("Область:");
        let district = safePrompt("Район:");
        let city = safePrompt("Город:");
        let street = safePrompt("Улица:");
        let house = safePrompt("Дом:");
        let apartment = safePrompt("Квартира:");
        let id = safePrompt("Почтовый индекс:");

        return createPersonObject({
            lastName, firstName, middleName, gender, nationality,
            height, weight, birthDay, birthMonth, birthYear, phone,
            country, region, district, city, street, house, apartment, id
        });

    } catch (error) {
        console.log(`Ввод отменен: ${error.message}`);
        return null;
    }
}


function CreatePeopleArray() {
    let people = [];

    try {
        console.log(" Создание баз данных");
        let number = safeNumberPrompt("Сколько людей вы хотите добавить?");

        if (number < 0) {
            console.log("Некорректное количество. Ввод отменен.");
            return people;
        }

        for (let i = 0; i < number; i++) {
            let person = inputPersonData(i + 1);
            if (person === null) {
                console.log(`Ввод человека ${i + 1} отменен. Пропускаем...`);
                continue;
            }
            people.push(person);
            console.log(`Человек ${i + 1} добавлен успешно.`);
        }

        console.log(`\nВсего добавлено: ${people.length} человек(а)`);

    } catch (error) {
        console.log(`Ошибка: ${error.message}`);
    }

    return people;
}

function displayPeople(people) {
    console.log('\n Список людей');

    if (people.length === 0) {
        console.log('Список пуст.');
        return;
    }

    people.forEach((person, i) => {
        console.log(`\nЧЕЛОВЕК ${i + 1}`);
        console.log(`  ФИО: ${person.lastName} ${person.firstName} ${person.middleName}`);
        console.log(`  Пол: ${person.gender}`);
        console.log(`  Национальность: ${person.nationality}`);
        console.log(`  Рост: ${person.height} см, Вес: ${person.weight} кг`);
        console.log(`  Дата рождения: ${person.birthDay}.${person.birthMonth}.${person.birthYear}`);
        console.log(`  Телефон: ${person.phone}`);
        console.log(`  Адрес: ${person.country}, ${person.region} обл., ${person.district} р-н, ${person.city}, ${person.street} ${person.house}/${person.apartment}`);
        console.log(`  Индекс: ${person.id}`);
    });

    console.log(`\nВсего записей: ${people.length}`);
}

function addPeople(people) {
    console.log('\n Добавление новых людей');

    let added = 0;
    let continueAdding = true;

    while (continueAdding) {
        let person = inputPersonData();
        if (person !== null) {
            people.push(person);
            added++;
            console.log(`Новый человек добавлен успешно.`);
        } else {
            console.log(`Ввод отменен.`);
        }

        try {
            let answer = safePrompt("Хотите добавить еще одного человека? (да/нет)", "да");
            if (answer.toLowerCase() !== 'да') {
                continueAdding = false;
            }
        } catch {
            continueAdding = false;
            console.log("⚠Ввод отменен. Завершаем добавление.");
        }
    }

    console.log(`\nДобавлено: ${added} человек(а)`);
    console.log(`Всего в массиве: ${people.length} человек(а)`);
    return people;
}

function searchPeople(people) {
    console.log('\n Поиск людей');

    if (people.length === 0) {
        console.log('Список пуст. Поиск невозможен.');
        return;
    }

    try {
        console.log("Выберите свойство для поиска:");
        console.log("1 - Фамилия");
        console.log("2 - Имя");
        console.log("3 - Отчество");
        console.log("4 - Пол");
        console.log("5 - Национальность");
        console.log("6 - Город");
        console.log("7 - Страна");
        console.log("8 - Год рождения");

        let choice = safeNumberPrompt("Введите номер свойства (1-8):");
        if (choice < 1 || choice > 8) {
            console.log("Неверный выбор свойства");
            return;
        }

        let searchValue = safePrompt("Введите значение для поиска:");

        const properties = ['lastName', 'firstName', 'middleName', 'gender',
            'nationality', 'city', 'country', 'birthYear'];
        const propNames = ['Фамилия', 'Имя', 'Отчество', 'Пол', 'Национальность',
            'Город', 'Страна', 'Год рождения'];

        let prop = properties[choice - 1];
        let propName = propNames[choice - 1];

        console.log(`\nПоиск по ${propName}: "${searchValue}"`);

        let results = people.filter(person => {
            let value = person[prop];
            if (typeof value === 'string') {
                return value.toLowerCase().includes(searchValue.toLowerCase());
            } else {
                return value.toString() === searchValue;
            }
        });

        if (results.length === 0) {
            console.log("Ничего не найдено.");
        } else {
            console.log(`\nНайдено записей: ${results.length}`);
            displayPeople(results);
        }

    } catch (error) {
        console.log(`Поиск отменен: ${error.message}`);
    }
}

function sortPeople(people) {
    console.log('\n Сортировка людей');

    if (people.length === 0) {
        console.log('Список пуст. Сортировка невозможна.');
        return people;
    }

    try {
        console.log("Выберите свойство для сортировки:");
        console.log("1 - Фамилия");
        console.log("2 - Имя");
        console.log("3 - Отчество");
        console.log("4 - Пол");
        console.log("5 - Национальность");
        console.log("6 - Город");
        console.log("7 - Страна");
        console.log("8 - Год рождения");

        let choice = safeNumberPrompt("Введите номер свойства (1-8):");
        if (choice < 1 || choice > 8) {
            console.log("Неверный выбор свойства");
            return people;
        }

        console.log("Выберите порядок сортировки:");
        console.log("1 - По возрастанию");
        console.log("2 - По убыванию");

        let order = safeNumberPrompt("Введите номер порядка (1-2):");
        if (order !== 1 && order !== 2) {
            console.log("Неверный выбор порядка");
            return people;
        }

        const properties = ['lastName', 'firstName', 'middleName', 'gender',
            'nationality', 'city', 'country', 'birthYear'];
        const propNames = ['Фамилии', 'Имени', 'Отчеству', 'Полу', 'Национальности',
            'Городу', 'Стране', 'Году рождения'];

        let prop = properties[choice - 1];
        let propName = propNames[choice - 1];
        let sortOrder = order === 1 ? 'по возрастанию' : 'по убыванию';

        let sortedPeople = [...people];

        sortedPeople.sort((a, b) => {
            let valueA = a[prop];
            let valueB = b[prop];

            if (typeof valueA === 'string') {
                valueA = valueA.toLowerCase();
                valueB = valueB.toLowerCase();
            }

            if (valueA < valueB) return order === 1 ? -1 : 1;
            if (valueA > valueB) return order === 1 ? 1 : -1;
            return 0;
        });

        console.log(`✅ Массив отсортирован по ${propName} ${sortOrder}!`);
        console.log("\nПервые 3 записи:");

        for (let i = 0; i < Math.min(3, sortedPeople.length); i++) {
            console.log(`  ${i+1}. ${sortedPeople[i].lastName} ${sortedPeople[i].firstName}`);
        }

        return sortedPeople;

    } catch (error) {
        console.log(`Сортировка отменена: ${error.message}`);
        return people;
    }
}


function createPerson() {
    peopleDB = CreatePeopleArray();
    console.log("Текущая база данных:", peopleDB.length, "записей");
}

function showAll() {
    displayPeople(peopleDB);
}

function addMore() {
    peopleDB = addPeople(peopleDB);
}

function findPerson() {
    searchPeople(peopleDB);
}

function sortPersons() {
    peopleDB = sortPeople(peopleDB);
}

function clearDB() {
    if (confirm("Очистить всю базу данных?")) {
        peopleDB = [];
        console.log("База данных очищена.");
    }
}


console.log("Используйте кнопки для работы с БД.");
