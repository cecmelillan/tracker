<?php 
$objDatos = json_decode(file_get_contents("php://input"));

if($objDatos->accion == "get")
	obtenerLista($objDatos);
	
if($objDatos->accion == "add")
	guardarTarea($objDatos);
	
if($objDatos->accion == "edit")
	actualizarTarea($objDatos->objeto);
	
if($objDatos->accion == "delete")
	borrarTarea($objDatos->objeto);
	
function obtenerLista($objDatos) {
	$data = null;
	
	try{
		$conn = new PDO('mysql:host=localhost;dbname=tracking', "root", "1234");
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		
		$date = $objDatos->fecha; //date("Y-m-d");

		$sql = $conn->prepare("SELECT * FROM track WHERE fecha  BETWEEN '".$date." 00:00:00' AND '".$date." 23:59:59' ORDER BY fecha DESC ");
		$sql->execute();
		$resultado = $sql->fetchAll();

		if(count($resultado) > 0) {
			foreach ($resultado as $row) {
				$data[] = array("id"=>$row["id"], "descripcion"=>$row["descripcion"], "fecha"=>$row["fecha"]);
			}
		}
	}catch(PDOException $e){
		echo "ERROR: " . $e->getMessage();
	}
	
	echo json_encode($data);
}

function guardarTarea($param) {

	try{
		$conn = new PDO('mysql:host=localhost;dbname=tracking', "root", "1234");
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		$sql = $conn->prepare("INSERT INTO track (descripcion, fecha) VALUES (?, ?)");
		$sql->bindParam(1, $param->descripcion);
		$sql->bindParam(2, $param->fecha);
		$sql->execute();

	}catch(PDOException $e){
		echo "ERROR: " . $e->getMessage();
	}

}

function actualizarTarea($param) {

	try{
		$conn = new PDO('mysql:host=localhost;dbname=tracking', "root", "1234");
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		$sql = $conn->prepare("UPDATE track SET descripcion = ?, fecha = ? WHERE id = ?");
		$sql->bindParam(1, $param->descripcion);
		$sql->bindParam(2, $param->fecha);
		$sql->bindParam(3, $param->id);
		$sql->execute();

	}catch(PDOException $e){
		echo "ERROR: " . $e->getMessage();
	}
	
	echo true;
}

function borrarTarea($param) {

	try{
		$conn = new PDO('mysql:host=localhost;dbname=tracking', "root", "1234");
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		$sql = "DELETE FROM track WHERE id = :ID";
		$stmt = $conn->prepare($sql);
		$stmt->bindParam(':ID', $param->id, PDO::PARAM_INT);   
		$stmt->execute();
		
		// $sql = $conn->prepare("UPDATE track SET descripcion = ?, fecha = ? WHERE id = ?");
		// $sql->bindParam(1, $param->descripcion);
		// $sql->bindParam(2, $param->fecha);
		// $sql->bindParam(3, $param->id);
		// $sql->execute();

	}catch(PDOException $e){
		echo "ERROR: " . $e->getMessage();
	}
	
	echo true;
}