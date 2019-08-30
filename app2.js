//setting up module pattern
var budgetController = (function(){
    //create function constructor using uppercase for first letter
    var Expense = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Income = function (id, description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    //now create  object to store the value
    var data = {
        //store all items
        allItems:{
            exp:[],
            inc:[]
        },

        totals:{
            exp:0,
            inc:0
        }
    }

    //return public object
    return {
        addItem: function(type,desc,val){
            var newItem, ID;
            
            if(data.allItems[type].length > 0){
                //id = last ID + 1
            ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
                console.log(ID);
            }else{
                ID = 0;
            }
            

            //create new item based on 'inc' or 'exp'

            if(type == 'exp'){
                newItem = new Expense(ID, desc, val)
            }else if(type == 'inc'){
                newItem = new Income(ID,desc,val)
            }

            data.allItems[type].push(newItem); // add to the array  list at the end
            return newItem;
        },
        testing:function(){
            console.log(data);
        }
    }

    

})();




// write method or function so that it can  use in the controller
//UI Controller
var UIController = (function(){

    //declare the elements in an object
    var DOMStrings = {
        
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue : '.add__value',
        inputBtn : '.add__btn',
        incomeContainer:'.income__list',
        expenseContainer:'.expenses__list'

    }

//return an object with the function the controller should access
return{

     getInput: function(){
         //return an object so  i can reference all the inputs
            return{
                        type: document.querySelector(DOMStrings.inputType).value, //inc or exp
                        description: document.querySelector(DOMStrings.inputDescription).value,
                        value: document.querySelector(DOMStrings.inputValue).value

                        
                };
            },
        addListItem: function(obj,type){
            var html, newHTML,element;
            //create  HTML  string with placeholder text
            if(type == "inc"){
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div> </div>';
            }else if(type == "exp"){
                element  = DOMStrings.expenseContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            }

            //replace the placeholder with some actual data
            //replace method search for a string and replace it with info
            newHTML = html.replace('%id%', obj.id);
            newHTML = newHTML.replace('%description%',obj.description);
            newHTML = newHTML.replace('%value%',obj.description);

            //insert the html into the dom
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
        },
        clearFields: function(){
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMStrings.inputDescription + ',' + DOMStrings.inputValue); // query selector return a list
           
            //pass the list as array
           fieldsArr =  Array.prototype.slice.call(fields);
            console.log(fieldsArr);
            
            fieldsArr.forEach(function(current, index, array){
                current.value = "";

            });
            fieldsArr[0].focus();

        },
           
            getDOMStrings: function(){
                return DOMStrings;
            }

           
}

})();






//controller - global app controller
//pass paramater but will pass the modules to this controller so he can manage them

var controller = (function(budgetCtrl, UICtrl){
    var DOM = UICtrl.getDOMStrings();
//setup event listener function to hold all

        var setupEventListener = function(){
            document.querySelector(DOM.inputBtn).addEventListener('click', ctlrAddItem)


            //add event listener to global event - wndow/ document
            document.addEventListener('keypress', function(e){
                //console.log(e);
                if(e.keyCode === 13 || e.Which === 13){
                    console.log('keyboard kept');
                    ctlrAddItem();
                }

            })


        }   


   
    var ctlrAddItem = function(){
        var input, newItem;
       console.log('test');
        // 1. get the input value
            var input = UICtrl.getInput(); 
        //2  Add new item to the data structor which the  budget controller
           newItem = budgetCtrl.addItem(input.type, input.description,input.value);

        //add new item to th UI

        UICtrl.addListItem(newItem,input.type);


        //clear the fields
        UICtrl.clearFields();
        //calculate the budget


        //display  the budget on the UI
    }

   
//initalization function

    return {
        init: function(){
            console.log('application has started');
            setupEventListener();
        }
    }
})(budgetController,UIController);



controller.init();