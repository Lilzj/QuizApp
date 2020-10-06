/*******************************************
 ******* Quiz Controller Starts here********
 ******************************************/
var quizController = (function() {


    function Question(id, questionText, options, correctAnswer) {
        this.id = id;
        this.questionText = questionText;
        this.options = options;
        this.correctAnswer = correctAnswer;
    }

    /**Creating local storage for question starts here*****/

    //storing, retriving and removing our questions method in local storage
    var questionLocalStorage = {

        setQuestionCollection: function(newCollection) {
            localStorage.setItem('questionCollection', JSON.stringify(newCollection));
        },

        getQuestionCollection: function() {
            return JSON.parse(localStorage.getItem('questionCollection'));
        },

        removeQuestionCollection: function() {
            localStorage.removeItem('questionCollection');
        }

    };

    //to set an empty array on local storage when it is empty
    if (questionLocalStorage.getQuestionCollection() === null) {

        questionLocalStorage.setQuestionCollection([]);
    }

    /**Creating local storage for question ends here*****/



    var quizProgress = {

        questionIndex: 0
    };

    //******* PERSON CONSTRUCT ******** 
    function persom(id, firstname, lastname, score) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.score = score;
    };

    var currPersonData = {

        fullname: [],
        score: 0
    };

    var adminFullName = ['admin', 'admin'];

    var personLocalStorage = {

        setPersonData: function(newPersonData) {
            localStorage.setItem('personData', JSON.stringify(newPersonData));
        },

        getPersonData: function() {
            return JSON.parse(localStorage.getItem('personData'));
        },

        removePersonData: function() {
            localStorage.removeItem('personData');
        }

    };

    if (personLocalStorage.getPersonData() === null) {
        personLocalStorage.setPersonData([]);
    }

    return {

        getQuizProgress: quizProgress,

        getQuestionLocalStorage: questionLocalStorage,

        addQuestionOnLocalStorage: function(newQuestText, opts) {

            //creating new question
            var optionsArr, corAns, questionId, newQuestion, getStoredQuest, isChecked;

            //to set an empty array on local storage when it is empty
            if (questionLocalStorage.getQuestionCollection() === null) {

                questionLocalStorage.setQuestionCollection([]);
            }

            optionsArr = [];
            questionId = 0;
            isChecked = false;

            for (i = 0; i < opts.length; i++) {

                if (opts[i].value !== '') {

                    optionsArr.push(opts[i].value);

                }

                if (opts[i].previousElementSibling.checked && opts[i].value !== "") {

                    corAns = opts[i].value;

                    isChecked = true;
                }

            }

            //incresing question id dynamically from local storage
            if (questionLocalStorage.getQuestionCollection().length > 0) {

                questionId = questionLocalStorage.getQuestionCollection()[questionLocalStorage.getQuestionCollection().length - 1].id + 1;

            } else {

                questionId = 0;
            }
            //
            if (newQuestText.value !== "") {

                if (optionsArr.length > 1) {

                    if (isChecked) {

                        newQuestion = new Question(questionId, newQuestText.value, optionsArr, corAns);

                        getStoredQuest = questionLocalStorage.getQuestionCollection();

                        getStoredQuest.push(newQuestion);

                        questionLocalStorage.setQuestionCollection(getStoredQuest);

                        //to clear the textarea and the inputs and checked button after inserting question into local storage
                        newQuestText.value = "";

                        for (x = 0; x < opts.length; x++) {

                            opts[x].value = "";

                            opts[x].previousElementSibling.checked = false;

                        }

                        return true;

                    } else {

                        alert('correct answer not checked or input without value is checked');

                        return false;
                    }

                } else {

                    alert('you must insert atleast two options');

                    return false;
                }

            } else {

                alert('please insert question');

                return false;
            }
        },
        checkAnswer: function(ans) {

            if (questionLocalStorage.getQuestionCollection()[quizProgress.questionIndex].correctAnswer === ans.textContent) {

                currPersonData.score++

                    return true

            } else {

                return false
            }
        },

        isFinished: function() {

            return quizProgress.questionIndex + 1 === questionLocalStorage.getQuestionCollection().length;
        },

        addPerson: function() {

            var newPerson, personId, personData;

            if (personLocalStorage.getPersonData().length > 0) {

                personId = personLocalStorage.getPersonData()[personLocalStorage.getPersonData().length - 1].id + 1;

            } else {

                personId = 0;

            }

            newPerson = new persom(personId, currPersonData.fullname[0], currPersonData.fullname[1], currPersonData.score);

            personData = personLocalStorage.getPersonData();

            personData.push(newPerson);

            personLocalStorage.setPersonData(personData);

            // console.log(newPerson)
        },

        getCurrPersonData: currPersonData,

        getAdminFullName: adminFullName,

        getpersonLocalStorage: personLocalStorage

    };



})();
/*****************************************
 ******* Quiz Controller Ends here********
 ****************************************/


/*****************************************
 ******* UI Controller starts here********
 ****************************************/
var UIController = (function() {

    /***Storing all our selected id's, classe's and storing them in a variable called domitems***/
    var domItems = {

        //**********Admin panel Elements*********/
        adminPanelSection: document.querySelector('.admin-panel-container'),
        questionInsertBtn: document.getElementById('question-insert-btn'),
        newQuestionText: document.getElementById('new-question-text'),
        adminOption: document.querySelectorAll('.admin-option'),
        adminOptionsContainer: document.querySelector('.admin-options-container'),
        insertedQuestionsWrapper: document.querySelector('.inserted-questions-wrapper'),
        questionUpdateBtn: document.getElementById('question-update-btn'),
        questionDeleteBtn: document.getElementById('question-delete-btn'),
        questsClearBtn: document.getElementById('questions-clear-btn'),
        resultListWrap: document.querySelector('.resuls-list-wrapper'),
        resultClearBtn: document.getElementById('results-clear-btn'),

        //********* Quiz section element ********/
        quizPageSection: document.querySelector('.quiz-container'),
        askedQuestion: document.getElementById('asked-question-text'),
        quizOptionsWrapper: document.querySelector('.quiz-options-wrapper'),
        progressBar: document.querySelector('progress'),
        progressPar: document.getElementById('progress'),
        insAnsCont: document.querySelector('.instant-answer-container'),
        insAnsText: document.getElementById('instatnt-answer-text'),
        instAnsDiv: document.getElementById('instant-answer-wrapper'),
        emotionIcon: document.getElementById('emotion'),
        nextQuestBtn: document.getElementById('next-question-btn'),

        //******** Landing page Elements *********/
        landPageSection: document.querySelector('.landing-page-container'),
        startQuizBtn: document.getElementById('start-quiz-btn'),
        firstNameInput: document.getElementById('firstname'),
        lastNameInput: document.getElementById('lastname'),

        //********* Final score section **********/
        finalScoreText: document.getElementById('final-score-text'),
        finalResultCon: document.querySelector('.final-result-container')
    };


    return {

        /***To make the selected Domitems above public we save it in a variable called "getDomItems" in the return statement***/
        getDomItems: domItems,

        //to add more input tag when focus on the last input element
        addInputsDynamically: function() {

            var addInput = function() {

                var inputHTML, z;

                z = document.querySelectorAll('.admin-option').length,

                    inputHTML = '<div class="admin-option-wrapper"><input type="radio" class="admin-option-' + z + '" value="' +
                    z + '" name="answer">  <input type="text" class="admin-option admin-option-' + z + '" value=""></div>';

                domItems.adminOptionsContainer.insertAdjacentHTML('beforeend', inputHTML);

                domItems.adminOptionsContainer.lastElementChild.previousElementSibling.lastElementChild.removeEventListener('focus', addInput);

                domItems.adminOptionsContainer.lastElementChild.lastElementChild.addEventListener('focus', addInput);
            }

            domItems.adminOptionsContainer.lastElementChild.lastElementChild.addEventListener('focus', addInput);
        },

        creatQuestionList: function(getQuestion) {

            var questHTML, numArr;

            numArr = [];

            domItems.insertedQuestionsWrapper.innerHTML = "";

            for (i = 0; i < getQuestion.getQuestionCollection().length; i++) {

                numArr.push(i + 1);

                questHTML = '<p><span>' + numArr[i] + '. ' + getQuestion.getQuestionCollection()[i].questionText + '  </span><button id="question-' +
                    getQuestion.getQuestionCollection()[i].id + '">Edit</button></p>';

                domItems.insertedQuestionsWrapper.insertAdjacentHTML('afterbegin', questHTML);
            }
        },

        editQuestList: function(event, storageQuestlist, addInpuDynFn, updateQuestListFn) {

            var getId, getStoredQuestList, foundItem, placeInArr, optionHTML;

            if ('question-'.indexOf(event.target.id)) {

                getId = parseInt(event.target.id.split('-')[1]);

                getStoredQuestList = storageQuestlist.getQuestionCollection()

                for (i = 0; i < getStoredQuestList.length; i++) {

                    if (getStoredQuestList[i].id === getId) {

                        foundItem = getStoredQuestList[i];

                        placeInArr = i;
                    }

                }
                domItems.newQuestionText.value = foundItem.questionText;

                domItems.adminOptionsContainer.innerHTML = "";

                optionHTML = "";

                for (x = 0; x < foundItem.options.length; x++) {

                    optionHTML += ' <div class="admin-option-wrapper"> <input type="radio" class="admin-option-' + x +

                        '"  value="' + x + '" name="answer"> <input type="text" class="admin-option admin-option-' +
                        x + '" value="' + foundItem.options[x] + '"></div>'

                }

                domItems.adminOptionsContainer.innerHTML = optionHTML;

                domItems.questionUpdateBtn.style.visibility = 'visible';

                domItems.questionDeleteBtn.style.visibility = 'visible';

                domItems.questionInsertBtn.style.visibility = 'hidden';

                domItems.questsClearBtn.style.pointerEvents = 'none';

                addInpuDynFn();

                var backDefaultView = function() {

                    var updateOptions;

                    domItems.newQuestionText.value = '';

                    updateOptions = document.querySelectorAll('.admin-option');

                    for (i = 0; i < updateOptions.length; i++) {

                        updateOptions[i].value = '';

                        updateOptions[i].previousElementSibling.checked = false;

                    }
                    domItems.questionUpdateBtn.style.visibility = 'hidden';

                    domItems.questionDeleteBtn.style.visibility = 'hidden';

                    domItems.questionInsertBtn.style.visibility = 'visible';

                    domItems.questsClearBtn.style.pointerEvents = '';

                    updateQuestListFn(storageQuestlist);

                }

                //Updating Questions and their options

                var updateQuestion = function() {

                    var newOptions, optionEls;

                    newOptions = [];

                    optionEls = document.querySelectorAll('.admin-option');

                    foundItem.questionText = domItems.newQuestionText.value;

                    foundItem.correctAnswer = "";

                    for (i = 0; i < optionEls.length; i++) {

                        if (optionEls[i].value !== "") {

                            newOptions.push(optionEls[i].value);

                            if (optionEls[i].previousElementSibling.checked) {

                                foundItem.correctAnswer = optionEls[i].value;
                            }
                        }

                    }

                    foundItem.options = newOptions;

                    if (foundItem.questionText !== '') {

                        if (foundItem.options.length > 1) {

                            if (foundItem.correctAnswer !== '') {

                                getStoredQuestList.splice(placeInArr, 1, foundItem);

                                storageQuestlist.setQuestionCollection(getStoredQuestList);

                                backDefaultView();

                            } else {

                                alert('correct answer not checked or input without value is checked');
                            }

                        } else {

                            alert('you must insert at least two options');
                        }

                    } else {

                        alert('please, insert question');
                    }
                }

                domItems.questionUpdateBtn.onclick = updateQuestion;


                //Deleting Questions and their options
                var deleteQuestion = function() {

                    getStoredQuestList.splice(placeInArr, 1)

                    storageQuestlist.setQuestionCollection(getStoredQuestList)

                    backDefaultView();
                }

                domItems.questionDeleteBtn.onclick = deleteQuestion;
            }

        },

        clearQuestList: function(storageQuestlist) {

            if (storageQuestlist.getQuestionCollection !== null) {

                if (storageQuestlist.getQuestionCollection().length > 0) {

                    var conf = confirm('warning! you are about to clear the entire question list, click ok to continue or cancel to go back');

                    if (conf) {

                        storageQuestlist.removeQuestionCollection();

                        domItems.insertedQuestionsWrapper.innerHTML = '';
                    }
                }
            }
        },

        // to display question after a user has sucessfully log in
        displayQuestion: function(storageQuestlist, progress) {

            var newOptionHTML, characArray;

            characArray = ['A', 'B', 'C', 'D', 'E', 'F'];

            if (storageQuestlist.getQuestionCollection().length > 0) {

                domItems.askedQuestion.textContent = storageQuestlist.getQuestionCollection()[progress.questionIndex].questionText;

                domItems.quizOptionsWrapper.innerHTML = '';

                for (i = 0; i < storageQuestlist.getQuestionCollection()[progress.questionIndex].options.length; i++) {

                    newOptionHTML = '<div class="choice-' + i + '"><span class="choice-' + 1 + '">' + characArray[i] + '</span> <p class="choice-' + i +

                        '">' + storageQuestlist.getQuestionCollection()[progress.questionIndex].options[i] + '</p>';

                    domItems.quizOptionsWrapper.insertAdjacentHTML('beforeend', newOptionHTML);

                }
            }
        },

        displayProgress: function(storageQuestlist, progress) {

            domItems.progressBar.max = storageQuestlist.getQuestionCollection().length;

            domItems.progressBar.value = progress.questionIndex + 1;

            domItems.progressPar.textContent = progress.questionIndex + 1 + '/' + storageQuestlist.getQuestionCollection().length;
        },

        newDesign: function(ansResult, SelAns) {

            var twoOptions, index;

            index = 0;

            if (ansResult) {

                index = 1;
            }

            twoOptions = {

                insAnswerText: ['This is a wrong Answer', 'This is a correct Answer'],

                insAnswerClass: ['red', 'green'],

                emotionType: ['images/abort-156539_1280.png', 'images/approved-151676_1280.png'],

                optSpanBg: [' rgba(200, 0, 0, .7)', ' rgba(0, 200, 0, .2)']
            };

            domItems.quizOptionsWrapper.style.cssText = "opacity: 0.6; pointer-events: none;";

            domItems.insAnsCont.style.opacity = '1';

            domItems.insAnsText.textContent = twoOptions.insAnswerText[index];

            domItems.instAnsDiv.className = twoOptions.insAnswerClass[index];

            domItems.emotionIcon.setAttribute('src', twoOptions.emotionType[index]);

            SelAns.previousElementSibling.style.backgroundColor = twoOptions.optSpanBg[index];
        },

        resetDesign: function() {

            domItems.quizOptionsWrapper.style.cssText = "";

            domItems.insAnsCont.style.opacity = '0';
        },

        getFullName: function(currPerson, storageQuestlist, admin) {

            if (domItems.firstNameInput.value !== '' && domItems.lastNameInput.value !== '') {

                if (!(domItems.firstNameInput.value === admin[0] && domItems.lastNameInput.value === admin[1])) {

                    if (storageQuestlist.getQuestionCollection().length > 0) {

                        currPerson.fullname.push(domItems.firstNameInput.value);

                        currPerson.fullname.push(domItems.lastNameInput.value);

                        domItems.landPageSection.style.display = 'none';

                        domItems.quizPageSection.style.display = 'block';

                    } else {

                        alert('Quiz is not ready yet, pls contact admin');
                    }

                } else {


                    domItems.landPageSection.style.display = 'none';

                    domItems.adminPanelSection.style.display = 'block';

                }

            } else {

                alert('pls! Enter your Firstname and Lastname');

            }
        },

        finalResult: function(currPerson, questionLocalStorage) {

            var getTotalQ, pass;


            getTotalQ = questionLocalStorage.getQuestionCollection().length;

            pass = getTotalQ - 2;

            if (currPerson.score > pass) {

                domItems.finalScoreText.textContent = currPerson.fullname[0] + ' ' + currPerson.fullname[1] + ',' + ' Your final score is ' + currPerson.score +
                    ' ' + 'Out of' + ' ' + getTotalQ + ' ' + 'Questions....' + ' ' + 'Welldone ' + ' ' + currPerson.fullname[0] + ',' + ' ' + 'With this score, it shows you are very Good';

            } else if (currPerson.score == pass) {

                domItems.finalScoreText.textContent = currPerson.fullname[0] + ' ' + currPerson.fullname[1] + ',' + ' Your final score is ' + currPerson.score +
                    ' ' + 'Out of' + ' ' + getTotalQ + ' ' + 'Questions....' + ' ' + 'Good but try and get more answers right next time';

            } else {

                domItems.finalScoreText.textContent = currPerson.fullname[0] + ' ' + currPerson.fullname[1] + ' Your final score is ' + currPerson.score +
                    ' ' + 'Out of' + ' ' + getTotalQ + ' ' + 'Questions....' + ' ' + currPerson.fullname[0] + ',' + ' ' + 'i know it is not easy but try again';

            }



            domItems.quizPageSection.style.display = 'none';

            domItems.finalResultCon.style.display = 'block';

            console.log(pass);

            Math.round(getTotalQ / currPerson.score);

        },

        addResultToAdminPanel: function(userData) {

            var resuHTML;

            domItems.resultListWrap.innerHTML = '';

            for (i = 0; i < userData.getPersonData().length; i++) {

                resuHTML = '<p class="person person-' + i + '"><span class="person-' + i + '">' + userData.getPersonData()[i].firstname +
                    ' ' + userData.getPersonData()[i].lastname + ':' + ' ' + 'Score' + ' ' + '=' + ' ' + userData.getPersonData()[i].score + '</span><button id="delete-result-btn_' +
                    userData.getPersonData()[i].id + '" class="delete-result-btn">Delete</button></p>';

                domItems.resultListWrap.insertAdjacentHTML('afterbegin', resuHTML);

            }

        },

        deleteResult: function(event, userData) {

            var getId, personArr;

            personArr = userData.getPersonData();

            if ('delete-result-btn_'.indexOf(event.target.id)) {

                getId = parseInt(event.target.id.split('_')[1]);

                for (i = 0; i < personArr.length; i++) {

                    if (personArr[i].id === getId) {

                        personArr.splice(i, 1);

                        userData.setPersonData(personArr);

                    }

                }
            }
        },

        clearResult: function(userData) {

            if (userData.getPersonData() !== null) {

                if (userData.getPersonData().length > 0) {

                    var conf = confirm('warning! you are about to clear the entire Result list, click ok to continue or cancel to go back');

                    if (conf) {

                        userData.removePersonData();

                        domItems.resultListWrap.innerHTML = '';
                    }
                }
            }
        }

    };


})();
/*****************************************
 ******* UI Controller Ends here********
 ****************************************/


/**************************************
 ******* Controller Starts here********
 *************************************/
var controller = (function(quizCtrl, UICtrl) {

    /***Storing the involke domitems in a variable for easy accessibility***/
    var selectedDomItems = UICtrl.getDomItems;

    UIController.addInputsDynamically();

    /****Involking create question list function******/
    UIController.creatQuestionList(quizCtrl.getQuestionLocalStorage);

    selectedDomItems.questionInsertBtn.addEventListener('click', function() {

        //to enable controller see the newly updated input, we reselect the admin-option
        var adminOption = document.querySelectorAll('.admin-option');

        var checkBoolean = quizCtrl.addQuestionOnLocalStorage(selectedDomItems.newQuestionText, adminOption)

        if (checkBoolean) {

            UIController.creatQuestionList(quizCtrl.getQuestionLocalStorage);
        }
    });

    //adding eventListener to enable editing question
    selectedDomItems.insertedQuestionsWrapper.addEventListener('click', function(e) {

        UICtrl.editQuestList(e, quizCtrl.getQuestionLocalStorage, UICtrl.addInputsDynamically, UICtrl.creatQuestionList);
    });

    selectedDomItems.questsClearBtn.addEventListener('click', function() {

        UICtrl.clearQuestList(quizCtrl.getQuestionLocalStorage);
    });

    UICtrl.displayQuestion(quizCtrl.getQuestionLocalStorage, quizCtrl.getQuizProgress);

    UICtrl.displayProgress(quizCtrl.getQuestionLocalStorage, quizCtrl.getQuizProgress);

    selectedDomItems.quizOptionsWrapper.addEventListener('click', function(e) {

        var updateOptionsDiv = selectedDomItems.quizOptionsWrapper.querySelectorAll('div');

        for (i = 0; i < updateOptionsDiv.length; i++) {

            if (e.target.className === 'choice-' + i) {

                var answer = document.querySelector('.quiz-options-wrapper div p.' + e.target.className);

                var ansResult = quizCtrl.checkAnswer(answer);

                UICtrl.newDesign(ansResult, answer);

                if (quizCtrl.isFinished()) {

                    selectedDomItems.nextQuestBtn.textContent = 'Finish';

                }

                var nextQuestion = function name(questdata, progress) {

                    if (quizCtrl.isFinished()) {

                        //Finish Quiz
                        quizCtrl.addPerson();

                        UICtrl.finalResult(quizCtrl.getCurrPersonData, quizCtrl.getQuestionLocalStorage);

                    } else {

                        UICtrl.resetDesign();

                        quizCtrl.getQuizProgress.questionIndex++;

                        UICtrl.displayQuestion(quizCtrl.getQuestionLocalStorage, quizCtrl.getQuizProgress);

                        UICtrl.displayProgress(quizCtrl.getQuestionLocalStorage, quizCtrl.getQuizProgress);
                    }
                }

                selectedDomItems.nextQuestBtn.onclick = function() {

                    nextQuestion(quizCtrl.getQuestionLocalStorage, quizCtrl.getQuizProgress);
                }
            }

        }
    });

    selectedDomItems.startQuizBtn.addEventListener('click', function() {

        UICtrl.getFullName(quizCtrl.getCurrPersonData, quizCtrl.getQuestionLocalStorage, quizCtrl.getAdminFullName);
    });

    selectedDomItems.lastNameInput.addEventListener('focus', function() {

        selectedDomItems.lastNameInput.addEventListener('keypress', function(e) {

            if (e.keyCode === 13) {

                UICtrl.getFullName(quizCtrl.getCurrPersonData, quizCtrl.getQuestionLocalStorage, quizCtrl.getAdminFullName);

            }

        });

    });

    UICtrl.addResultToAdminPanel(quizCtrl.getpersonLocalStorage);

    selectedDomItems.resultListWrap.addEventListener('click', function(e) {

        UICtrl.deleteResult(e, quizCtrl.getpersonLocalStorage);

        UICtrl.addResultToAdminPanel(quizCtrl.getpersonLocalStorage);

    });

    selectedDomItems.resultClearBtn.addEventListener('click', function() {

        UICtrl.clearResult(quizCtrl.getpersonLocalStorage);


    });

})(quizController, UIController);
/**************************************
 ******* Controller Ends here********
 *************************************/
