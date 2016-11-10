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

		$sql = $conn->prepare("SELECT * FROM free ". $where ." ORDER BY url DESC ");
		$sql->execute();
		$resultado = $sql->fetchAll();

		if(count($resultado) > 0) {
			foreach ($resultado as $key => $row) {
				$data[] = array(
						"id"=>$row["id"], 
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

		$sql = $conn->prepare("INSERT INTO free (url, nombre, descripcion) VALUES (?, ?, ?)");
		$sql->bindParam(1, $param->url);
		$sql->bindParam(2, $param->nombre);
		$sql->bindParam(3, $param->descripcion);
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

		$sql = $conn->prepare("UPDATE free SET url = ?, nombre = ?, descripcion = ? WHERE id = ?");
		$sql->bindParam(1, $param->url);
		$sql->bindParam(2, $param->nombre);
		$sql->bindParam(3, $param->descripcion);
		$sql->bindParam(4, $param->id);
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

		$sql = "DELETE FROM free WHERE id = :ID";
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
	if(!is_null($filtro->url))
		$where .= $where == "" ? " WHERE url LIKE '%".$filtro->url."%'" :  " AND url LIKE '%".$filtro->url."%'";
		
	if(!is_null($filtro->nombre))
		$where .= $where == "" ? " WHERE nombre LIKE '%".$filtro->nombre ."%'" :  " AND nombre LIKE '%".$filtro->nombre ."%'";
		
	return $where;
}
