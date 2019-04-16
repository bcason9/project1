var dietaryOptions = ["vegetarianOption", "everythingOption", "glutenFreeOption"];
var chosenDietaryOption = -1;

function  onOptionClick(elem){
 var newSelection = elem.val.toInt();
  if(chosenDietaryOption != -1) {
    var imageID = oldOption.dietaryOptions[chosenDietaryOption + "Image"];
    var selectedImageID = oldOption.dietaryOptions[chosenDietaryOption + "selectedImage"];
    document.getElementById(imageID).style.display = "";
    document.getElementById(selectedImageID).style.display ="none";
  }

 if(newSelection === previousSlection){
   chosenDietaryOption = -1;
 }
else if (elm.id === "vegetarionOption"){
  chosenDietaryOption = 0;
}else if (elm.id === "everythingOption"){
  chosenDietaryOption = 1;
}else if (elm.id === "glutenFreeOption"){
  chosenDietaryOption = 2;

  if(chosenDietaryOption !== -1) {
    var imageID = oldOption.dietaryOptions[chosenDietaryOption + "Image"];
    document.getElementById(imageID).style.display = "none";
    document.getElementById(selectedImageID).style.display ="";

  }

}
}



















  // $('img').on('click', function() {
  //   alert("clicked!");
  //   //   var checkBox = document.getElementsByClassName(".checkBox")
  //   //  var 
  //   });




    
    
  //   function confirmChecked(){
    
  //       // To get all checked value
  //       var boxes = document.getElementsByName("userDietType");
     
  //       // To get the checked item
  //       var cnt = boxes.length;
     
  //       for(var i=0; i<cnt; i++) {
  //           if(boxes.item(i).checked) {
  //              console.log((boxes.item(i).value))
          
  //           }
  //   }
  // }