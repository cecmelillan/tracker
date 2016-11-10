<?php 
$objDatos = json_decode(file_get_contents("php://input"));

if($objDatos->accion == "get")
	obtenerLista($objDatos);
	
if($objDatos->accion == "add")
	guardarTarea($objDatos->objeto);
	
if($objDatos->accion == "edit")
	actualizarTarea($objDatos->objeto);
	
if($objDatos->accion == "delete")
	borrarTarea($objDatos->objeto);
	
function obtenerLista($objDatos) {
	$data = null;
	$where = procesarFiltro($objDatos->filtro);
	try{
		$conn = new PDO('mysql:host=localhost;dbname=tracking', "root", "1234");
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		//para evitar problemas con las ñ y acentos de los registros
		$conn->query("SET NAMES 'utf8'");

		$sql = $conn->prepare("SELECT * FROM medios ". $where ." ORDER BY id DESC ");
		$sql->execute();
		$resultado = $sql->fetchAll();

		if(count($resultado) > 0) {
			foreach ($resultado as $key => $row) {
				$data[] = array(
						"id"=>$row["id"], 
						"alcance"=>$row["alcance"],
						"url"=>$row["url"],
						"nombre"=>$row["nombre"],
						"descripcion"=>$row["descripcion"]
						);
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
		//para evitar problemas con las ñ y acentos de los registros
		$conn->query("SET NAMES 'utf8'");

		$sql = $conn->prepare("INSERT INTO medios (alcance, url, nombre, descripcion) VALUES (?, ?, ?, ?)");
		$sql->bindParam(1, $param->alcance);
		$sql->bindParam(2, $param->url);
		$sql->bindParam(3, $param->nombre);
		$sql->bindParam(4, $param->descripcion);
		$sql->execute();

	}catch(PDOException $e){
		echo "ERROR: " . $e->getMessage();
	}
	
	echo 1;

}

function actualizarTarea($param) {

	try{
		$conn = new PDO('mysql:host=localhost;dbname=tracking', "root", "1234");
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$conn->exec("set names utf8");

		$sql = $conn->prepare("UPDATE medios SET alcance = ?, url = ?, nombre = ?, descripcion = ? WHERE id = ?");
		$sql->bindParam(1, $param->alcance);
		$sql->bindParam(2, $param->url);
		$sql->bindParam(3, $param->nombre);
		$sql->bindParam(4, $param->descripcion);
		$sql->bindParam(5, $param->id);
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

		$sql = "DELETE FROM medios WHERE id = :ID";
		$stmt = $conn->prepare($sql);
		$stmt->bindParam(':ID', $param->id, PDO::PARAM_INT);   
		$stmt->execute();

	}catch(PDOException $e){
		echo "ERROR: " . $e->getMessage();
	}
	
	echo true;
}

function procesarFiltro($filtro) {
	$where = "";
	if(!is_null($filtro->alcance))
		$where .= $where == "" ? " WHERE alcance = ".$filtro->alcance :  " AND alcance = ".$filtro->alcance;
		
	if(!is_null($filtro->nombre))
		$where .= $where == "" ? " WHERE nombre LIKE '%".$filtro->nombre ."%'" :  " AND nombre LIKE '%".$filtro->nombre ."%'";
		
	return $where;
}
