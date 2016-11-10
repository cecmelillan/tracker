<?php
  //Creamos los parametros iniciales
  //estos podrían proceder de un formulario, sql, etc...
  $filas = 10001;
  $columnas = 10;
  $texto = 0;
  $grey = true;
  ?>
  
<!-- Creamos el inicio de la tabla manualmente-->
<table border="1">
 <?php
 //Iniciamos el bucle de las filas
 for($t=0;$t<$filas;$t++){
  echo "<tr>";
  //Iniciamos el bucle de las columnas
  for($y=0;$y<$columnas;$y++){
	$caracter = "&#".$texto.";";
   if($grey){
    //Pintamos el cuadro
    echo "<td style=padding:3px;
        background-color:#F5D0A9;>".$texto."</td>";
    echo "<td style=padding:3px;
        background-color:#F5D0A9;>".$caracter."</td>";
    //El próximo no será pintado
    $grey=false;
    $texto++;
   }else{
    //Dejamos cuadro en blanco
    echo "<td style=padding:3px;>".$texto."</td>";
    echo "<td style=padding:3px;>".$caracter."</td>";
    //El próximo será pintado
    $grey=true;
    $texto++;
    }
   }
   //Cerramos columna
   echo "</tr>";
  }
 ?>
 <!-- Cerramos tabla -->
 </table>
 
 <?php
/*
// &#8476;
for ($i = 0; $i <= 10000; $i++) {
	$letra = "&#".$i.";";
	print "$i  =>  $letra <br />";
}
*/
/*
for ($i = 0; $i <= 10000; $i++) {
	$letra = chr($i);
	print "$i  =>  $letra <br />";
}
*/
/*
// mostrar los caracteres ascii imprimibles 32 <= valor <= 126
// pero en este caso se muestran 10 caracteres por fila
echo "tabla ascii<br />";
$contador = 1;
for ($i = 1; $i <= 8477; $i++) {
	$letra = chr($i);
	print "$letra  ";
	if (($contador % 10) == 0) {
		echo "<br />";
	}
	$contador++;

}
*/
?>