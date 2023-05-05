document.addEventListener('DOMContentLoaded', function () {
    console.log(window.location.href)
    if (window.location.href== "http://127.0.0.1:8000/"){
        index_view();
    }
});


function index_view(){
    let type_exps= []
    let amount_exps = []
    let color_exps =[]
    let dict = {};
    let totalamm = 0;
    fetch('/collect_info', {method: 'POST'})
    .then(response => response.json())
    .then(expe => {
            expe.forEach(element => {
                totalamm = totalamm + element.amountexp;


                // ------------ Temp ----------------- //
                // if(type_exps.length === 0 ){
                //     type_exps.push(element.typeexp)
                //     amount_exps.push(element.amountexp)
                //     color_exps.push(getRandomColor())
                // }
                // else{
                //     for(let i = 0 ; i < type_exps.length ; i++ ){
                //         if (type_exps[i] != element.typeexp){
                //             type_exps.push(element.typeexp)
                //             amount_exps.push(element.amountexp)
                //             color_exps.push(getRandomColor())
                //             break
                //         }
                //     }
                // }
                // ------------ Temp ----------------- //

                //------------- DICT ---------------//
                
                if (Object.keys(dict).length == 0){
                    dict[element.typeexp] = element.amountexp;
                    color_exps.push(getRandomColor())
                }
                else{
                    if(element.typeexp in dict){
                        var key = element.typeexp
                        var value = dict[key];
                        // console.log(value);
                        // console.log(dict[key]);
                        // console.log(key);
                        // console.log(Object.keys(dict));
                        // console.log(Object.values(dict));
                        dict[key] = value + element.amountexp;
                    }
                    else{
                        dict[element.typeexp] = element.amountexp;
                        color_exps.push(getRandomColor())
                    }
                }

                //------------- DICT ---------------//

                console.log(totalamm)
                var str = element.typeexp
                const arr = str.split(" ");

                //loop through each element of the array and capitalize the first letter.


                for (var i = 0; i < arr.length; i++) {
                    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
                
                }

                //Join all the elements of the array back into a string 
                //using a blankspace as a separator 
                const str2 = arr.join(" ");
                console.log(str2);


                let outer = document.createElement('div');
                outer.classList.add("exp-column")
                
                let expenses = document.createElement('div');
                expenses.classList.add("exp-card");


                expenses.innerHTML = `
                    <strong >${element.nameexp}</strong>
                    <strong > ${element.amountexp}₹</strong>
                    <strong > ${str2}</strong>
                    <strong > ${element.timestamp}</strong>
                    `;

                outer.appendChild(expenses)

                const a=document.getElementById('all-expenses');
                a.appendChild(outer)
                // document.querySelector('body').append(expenses)
                }

            )

            if(totalamm == 0){
                const a=document.getElementById('editable');
                const b=document.getElementById('editable2');
                const c=document.getElementById('editable3');

                console.log("HELLO SER")
                console.log(a)
                a.innerHTML = "GET SOME DATA !!!!!"
                b.style.display= 'none'
                c.style.display= 'none'
            }
            else{

            const b=document.getElementById('total-expense');
            b.innerHTML= totalamm +' ₹';
            
            console.log(dict)
            Chart.defaults.global.defaultFontColor = "#fff";
            new Chart(document.getElementById("doughnut-chart"), {
                type: 'doughnut',
                
                data: {
                  labels: Object.keys(dict)
                  ,
                  datasets: [
                    {
                      backgroundColor:color_exps,
                      data: Object.values(dict),
                    }
                  ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true, 
                    plugins:{
                        title: {
                            display: true,
                            text: 'Total Expence'
                          }
                    }
                  
                }
            }
            );
        
        
        }

        }

            
        
        
        );

        // console.log(names_exps)
};



function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}