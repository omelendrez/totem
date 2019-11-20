-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: localhost    Database: escng_totem
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `escng_totem`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `escng_totem` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;

USE `escng_totem`;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT '',
  `status_id` int(11) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `category_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Carnes','c_1.jpg',1,'2019-02-17 13:00:11','2019-09-25 12:58:32'),(2,'Hamburguesas','c_2.jpg',1,'2019-02-17 13:00:25','2019-09-25 12:58:52'),(3,'Ensaladas','c_3.jpg',1,'2019-02-17 13:00:37','2019-09-25 12:58:43'),(4,'Papas','c_4.jpg',1,'2019-02-17 13:00:48','2019-09-25 13:38:07'),(5,'Bebidas','c_5.jpg',1,'2019-02-17 13:01:00','2019-09-25 13:00:03'),(6,'Mini Box','c_6.jpg',1,'2019-02-17 13:01:10','2019-09-25 12:59:04');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cc_payment`
--

DROP TABLE IF EXISTS `cc_payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cc_payment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) DEFAULT NULL,
  `response` varchar(8000) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cc_payment`
--

LOCK TABLES `cc_payment` WRITE;
/*!40000 ALTER TABLE `cc_payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `cc_payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `config`
--

DROP TABLE IF EXISTS `config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `updates` tinyint(4) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `config`
--

LOCK TABLES `config` WRITE;
/*!40000 ALTER TABLE `config` DISABLE KEYS */;
INSERT INTO `config` VALUES (1,1,'2018-10-24 00:00:00','2018-11-04 21:49:35');
/*!40000 ALTER TABLE `config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discount`
--

DROP TABLE IF EXISTS `discount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `discount` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `percent` decimal(10,2) DEFAULT '0.00',
  `status_id` int(11) DEFAULT '2',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discount`
--

LOCK TABLES `discount` WRITE;
/*!40000 ALTER TABLE `discount` DISABLE KEYS */;
/*!40000 ALTER TABLE `discount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `totem_id` int(11) DEFAULT '0',
  `order_number` varchar(255) DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT '0.00',
  `discount` decimal(10,2) DEFAULT '0.00',
  `net_price` decimal(10,2) DEFAULT '0.00',
  `payment_method` int(11) DEFAULT '1',
  `order_printed` int(11) DEFAULT '0',
  `status_id` int(11) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_order_number` (`order_number`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (1,1,'00001',625.00,0.00,625.00,1,0,0,'2019-10-25 17:25:38','2019-10-25 17:25:38'),(2,1,'00002',170.00,0.00,170.00,1,0,1,'2019-10-25 17:27:00','2019-10-25 17:27:44'),(3,1,'00003',330.00,0.00,330.00,1,0,1,'2019-10-25 17:28:19','2019-10-25 17:28:48'),(4,1,'00004',275.00,0.00,275.00,1,0,1,'2019-10-25 17:30:19','2019-10-25 17:30:49'),(5,1,'00005',275.00,0.00,275.00,1,0,0,'2019-10-28 16:20:06','2019-10-28 16:20:06'),(6,1,'00006',275.00,0.00,275.00,2,1,2,'2019-10-28 16:52:39','2019-10-28 16:53:31'),(7,1,'00007',190.00,0.00,190.00,1,0,2,'2019-10-28 16:57:44','2019-10-28 16:59:47');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `order_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `kitchen_text` varchar(255) DEFAULT NULL,
  `ticket_text` varchar(255) DEFAULT NULL,
  `unit_price` decimal(10,2) DEFAULT '0.00',
  `total_price` decimal(10,2) DEFAULT '0.00',
  `discount` decimal(10,2) DEFAULT '0.00',
  `net_price` decimal(10,2) DEFAULT '0.00',
  `status_id` int(11) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_items_order_id` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,1,12,'JAMES BOND',1,'JAMES BOND','COMBO JAMES BOND  C/SPRITE MEDIANA',275.00,275.00,0.00,275.00,0,'2019-10-25 17:25:38','2019-10-25 17:25:38'),(2,1,4,'JOTAQU',1,'JOTAQU','COMBO JOTAQU C/FANTA NARANJA MEDIANA',350.00,350.00,0.00,350.00,0,'2019-10-25 17:25:38','2019-10-25 17:25:38'),(3,2,31,'MENÚ BAHIENSE',1,'JUNIOR L/T','BAHIENSE L/T C/SPRITE MEDIANA',170.00,170.00,0.00,170.00,1,'2019-10-25 17:27:00','2019-10-28 17:03:50'),(4,3,2,'BROOKLYN',1,'BROOKLYN','COMBO BROOKLYN C/FANTA NARANJA MEDIANA',330.00,330.00,0.00,330.00,1,'2019-10-25 17:28:19','2019-10-28 17:03:55'),(5,4,1,'CLASSIC LT',1,'CLASSIC LT','COMBO CLASSIC L/T C/COCA COLA MEDIANA',275.00,275.00,0.00,275.00,1,'2019-10-25 17:30:19','2019-10-28 17:04:06'),(6,5,1,'CLASSIC LT',1,'CLASSIC LT','COMBO CLASSIC L/T C/COCA COLA MEDIANA',275.00,275.00,0.00,275.00,0,'2019-10-28 16:20:06','2019-10-28 16:20:06'),(7,6,1,'CLASSIC LT',1,'CLASSIC LT','COMBO CLASSIC L/T C/COCA COLA MEDIANA',275.00,275.00,0.00,275.00,0,'2019-10-28 16:52:39','2019-10-28 16:52:39'),(8,7,11,'OLIVIA',1,'OLIVIA','COMBO HAMB. OLIVIA C/COCA COLA MEDIANA',190.00,190.00,0.00,190.00,0,'2019-10-28 16:57:44','2019-10-28 16:57:44');
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `printer_error`
--

DROP TABLE IF EXISTS `printer_error`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `printer_error` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_number` varchar(255) DEFAULT '',
  `printer_id` int(11) DEFAULT NULL,
  `printer_interface` varchar(255) DEFAULT '',
  `printer_name` varchar(255) DEFAULT '',
  `error_message` varchar(255) DEFAULT '',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `printer_error`
--

LOCK TABLES `printer_error` WRITE;
/*!40000 ALTER TABLE `printer_error` DISABLE KEYS */;
/*!40000 ALTER TABLE `printer_error` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `kitchen_text` varchar(255) DEFAULT '',
  `ticket_text` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `price` decimal(10,2) DEFAULT '0.00',
  `small_price` decimal(10,2) DEFAULT '0.00',
  `medium_price` decimal(10,2) DEFAULT '0.00',
  `big_price` decimal(10,2) DEFAULT '0.00',
  `image` varchar(255) DEFAULT '',
  `is_combo` int(11) DEFAULT '0',
  `has_alcohol` int(11) DEFAULT '0',
  `status_id` int(11) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'02-001','CLASSIC LT','Cheddar, lechuga y tomate','CLASSIC LT','COMBO CLASSIC L/T C/{GASEOSA}',2,275.00,0.00,0.00,0.00,'p_1.jpg',0,0,1,'2019-02-18 23:05:01','2019-09-23 13:12:41'),(2,'02-002','BROOKLYN','Panceta, cheddar, cebolla, pepinillos y barbacoa','BROOKLYN','COMBO BROOKLYN C/{GASEOSA}',2,330.00,0.00,0.00,0.00,'p_2.jpg',0,0,1,'2019-02-18 23:06:08','2019-09-19 13:36:33'),(3,'02-003','BESTIA','Panceta, cheddar, cebolla, pepinillos y barbacoa','BESTIA','COMBO BROOKLYN C/{GASEOSA}',2,380.00,0.00,0.00,0.00,'p_3.jpg',0,0,1,'2019-02-18 23:06:57','2019-09-19 13:36:51'),(4,'02-004','JOTAQU','Doble carne, doble jamón, doble queso, lechuga y tomate. Aderezo Mostanesa','JOTAQU','COMBO JOTAQU C/{GASEOSA}',2,350.00,0.00,0.00,0.00,'p_4.jpg',0,0,1,'2019-02-18 23:08:08','2019-09-19 13:37:13'),(5,'02-005','GOLDEN CHICKEN','Pechuga de pollo marinada, queso, tomate y cebolla morada. Aderezo crema de palta','GOLDEN CHICKEN','COMBO GOLDEN CHICKEN C/{GASEOSA}',1,250.00,0.00,0.00,0.00,'p_5.jpg',0,0,1,'2019-02-18 23:09:14','2019-09-19 13:37:47'),(6,'02-006','POLLO CRUNCHY','Milanesa de pechuga en pan ciabatta con aceitunas negras, muzza y tomate. Aderezo mayo de albahaca.','POLLO CRUNCHY','COMBO POLLO CRUNCH C/{GASEOSA}',1,300.00,0.00,0.00,0.00,'p_6.jpg',0,0,1,'2019-02-18 23:10:28','2019-09-19 13:37:56'),(7,'02-007','BIFE DE CHORIZO CRIOLLO','Bife de chorizo,  muzzarella, lechuga y tomate. Aderezo chiminesa','Criolla','Combo Bife criollo c/{GASEOSA}',1,300.00,0.00,0.00,0.00,'p_7.jpg',0,0,1,'2019-02-20 18:10:30','2019-09-19 13:38:12'),(8,'02-008','BIFE DE CHORIZO EL MATADOR ','Bife de chorizo, panceta, cheddar, cebolla morada, lechuga y tomate. Aderezo Mostanesa','MATADOR','MATADOR C/{GASEOSA}',1,380.00,0.00,0.00,0.00,'p_8.jpg',0,0,1,'2019-02-20 18:12:08','2019-09-19 13:38:21'),(9,'02-009','FARMER','Carne mixta, cheddar, repollo blanco, lomito de cerdo ahumado. Aderezo Mostanesa','FARMER','FARMER C/{GASEOSA}',2,285.00,0.00,0.00,0.00,'p_9.jpg',0,0,1,'2019-02-20 18:13:33','2019-09-19 13:38:44'),(10,'02-010','GLUTEN FREE','Pan sin gluten, carne vacuna, lechuga y tomate','GLUTEN FREE','COMBO GLUTEN FREE C/{GASEOSA}',2,300.00,0.00,0.00,0.00,'p_a.jpg',0,0,2,'2019-02-20 18:14:44','2019-09-23 13:40:01'),(11,'02-011','OLIVIA','Hamburguesa de calabaza, muzza, rúcula, tomate, cebolla morada. Aderezo mayo de albahaca.','OLIVIA','COMBO HAMB. OLIVIA C/{GASEOSA}',2,190.00,0.00,0.00,0.00,'p_b.jpg',0,0,1,'2019-02-20 18:16:00','2019-09-03 12:21:26'),(12,'02-012','JAMES BOND','Bondiola de cerdo, queso, lechuga y tomate. Aderezo chiminesa','JAMES BOND','COMBO JAMES BOND  C/{GASEOSA}',1,275.00,0.00,0.00,0.00,'p_c.jpg',0,0,1,'2019-02-20 18:17:08','2019-09-23 13:45:54'),(19,'04-019','PAPAS GUAPAS','con panceta y cheddar!','','PAPAS GUAPAS',4,160.00,0.00,0.00,0.00,'p_13.jpg',0,0,1,'2019-02-20 18:33:47','2019-08-20 13:58:22'),(20,'04-020','PAPAS BRAVAS','Papas con champignones salteados y ciboulette! Espolvoreadas con ají y pimentón','','PAPAS BRAVAS',4,180.00,0.00,0.00,0.00,'p_14.jpg',0,0,1,'2019-02-20 18:34:27','2019-08-20 13:58:30'),(22,'04-022','PAPAS  CHICAS','Crujientes y deliciosas!','','PAPAS  CHICAS',4,55.00,0.00,0.00,0.00,'p_16.jpg',0,0,1,'2019-02-20 18:35:52','2019-08-20 13:59:23'),(23,'04-023','PAPAS  MEDIANAS','Crujientes y deliciosas!','','PAPAS  MEDIANAS',4,65.00,0.00,0.00,0.00,'p_17.jpg',0,0,1,'2019-02-20 18:36:49','2019-08-20 13:59:36'),(24,'04-024','PAPAS  GRANDES','Crujientes y deliciosas!','','PAPAS  GRANDES',4,75.00,0.00,0.00,0.00,'p_18.jpg',0,0,1,'2019-02-20 18:37:20','2019-08-20 13:59:54'),(25,'04-025','PAPAS SMILE','Papas sonrisa!','PAPAS SMILE ','PAPAS SMILE ',4,60.00,0.00,0.00,0.00,'',0,0,2,'2019-02-20 18:38:11','2019-08-22 13:20:43'),(26,'04-026','PAPAS GLUTEN FREE','Papas fritas sin TACC','','PAPAS SIN TACC',4,65.00,0.00,0.00,0.00,'p_1a.jpg',0,0,2,'2019-02-20 18:38:57','2019-09-25 12:51:12'),(27,'02-027','MINI BOX 1','Hamburguesa con queso + papas y gaseosa chica + Kinder','HAMB. C/QUESO','MINI BOX HAMB. C/QUESO C/{GASEOSA}',6,260.00,0.00,0.00,0.00,'p_1b.jpg',0,0,1,'2019-02-20 18:40:11','2019-09-23 13:44:56'),(29,'02-029','MINI BOX 3','Tostado de jamón y queso + papas smile + gaseosa chica + Kinder','JUNIOR TOST + SMILE','MINI BOX J/Q-SMILE C/{GASEOSA}',6,230.00,0.00,0.00,0.00,'p_1d.jpg',0,0,1,'2019-02-20 18:42:59','2019-09-23 13:45:20'),(30,'02-030','MINI BOX 2','Patitas de pollo  + papas y gaseosa chica + Kinder','CHICKENS X 4','MINI BOX CHIKENS C/{GASEOSA}',6,250.00,0.00,0.00,0.00,'p_1e.jpg',0,0,1,'2019-02-20 18:44:35','2019-09-23 13:45:36'),(31,'02-031','MENÚ BAHIENSE','Hamburguesa junior con lechuga y tomate','JUNIOR L/T','BAHIENSE L/T C/{GASEOSA}',2,170.00,0.00,0.00,0.00,'p_1f.jpg',0,0,1,'2019-02-20 18:45:40','2019-09-19 13:39:49'),(32,'02-032','MENÚ BAHIENSE POLLO','Medallón de pollo junior con lechuga y tomate','MILA POLLO CHICA','BAHIENSE L/T POLLO C/{GASEOSA}',2,170.00,0.00,0.00,0.00,'p_20.jpg',0,0,1,'2019-02-20 18:46:49','2019-09-23 13:52:26'),(34,'03-034','ENSALADA VERDE','Lechuga, zanahoria, nuez, aceitunas negras, queso en cubos, cherries y zucchini asados en oliva.','','ENSALADA VERDE',3,240.00,0.00,0.00,0.00,'p_22.jpg',0,0,1,'2019-02-20 18:48:47','2019-09-23 13:55:55'),(35,'03-035','ENSALADA NIPONA','Mix de hojas verdes, salmón ahumado, rúcula, cherries, cebolla morada, crema de palta y sésamo. ','','ENSALADA NIPONA',3,295.00,0.00,0.00,0.00,'p_23.jpg',0,0,1,'2019-02-20 18:50:05','2019-09-23 13:56:23'),(36,'03-036','ENSALADA CAESAR','Lechuga, cherries, croutons, cubos de pechuga grillada y queso parmesano. Aderezo salsa caesar.','','ENSALADA CAESAR ',3,280.00,0.00,0.00,0.00,'p_24.jpg',0,0,1,'2019-02-20 18:51:04','2019-09-23 13:57:49'),(37,'03-037','ENSALADA TUTTI','Arroz, cherries, choclo en granos, queso, jamón cocido y cubos de pechuga grillada.','','ENSALADA TUTTI',3,280.00,0.00,0.00,0.00,'p_25.jpg',0,0,1,'2019-02-20 18:51:46','2019-09-23 13:58:17'),(38,'05-038','AGUA SABORIZADA','AGUA SABORIZADA','','AGUA SABORIZADA',5,65.00,0.00,0.00,0.00,'p_26.jpg',1,0,1,'2019-02-20 18:54:15','2019-09-02 20:46:09'),(39,'05-039','AGUA SIN GAS','AGUA SIN GAS','','AGUA SIN GAS',5,55.00,0.00,0.00,0.00,'p_27.jpg',1,0,1,'2019-02-20 18:54:34','2019-09-02 20:46:22'),(41,'05-041','LATA IMPERIAL STOUT','LATA IMPERIAL NEGRA','','LATA IMPERIAL NEGRA',5,130.00,0.00,0.00,0.00,'p_29.jpg',1,1,1,'2019-02-20 18:55:08','2019-09-30 13:39:54'),(42,'05-042','LATA IMPERIAL RUBIA ','LATA IMPERIAL RUBIA ','','LATA IMPERIAL RUBIA ',5,110.00,0.00,0.00,0.00,'p_2a.jpg',1,1,1,'2019-02-20 18:55:26','2019-09-02 20:47:01'),(43,'05-043','LATA HEINEKEN','LATA HEINEKEN','','LATA HEINEKEN',5,130.00,0.00,0.00,0.00,'p_2b.jpg',1,1,1,'2019-02-20 18:55:43','2019-09-02 20:47:12'),(44,'05-044','JUGO CEPITA','JUGO CEPITA','','JUGO CEPITA',5,50.00,0.00,0.00,0.00,'p_2c.jpg',1,0,1,'2019-02-20 18:55:58','2019-09-02 20:47:29'),(45,'05-045','COCA COLA','COCA COLA','','COCA COLA',5,0.00,50.00,65.00,80.00,'p_2d.jpg',1,0,1,'2019-02-20 18:56:19','2019-09-07 11:37:56'),(48,'05-048','FANTA NARANJA','FANTA NARANJA','','FANTA NARANJA',5,0.00,50.00,65.00,80.00,'p_30.jpg',1,0,1,'2019-02-20 18:57:06','2019-09-07 11:40:21'),(51,'05-051','SPRITE','SPRITE','','SPRITE',5,0.00,50.00,65.00,80.00,'p_33.jpg',1,0,1,'2019-02-20 18:57:54','2019-09-07 11:39:40'),(54,'05-054','COCA ZERO','COCA ZERO','','COCA ZERO',5,0.00,50.00,65.00,80.00,'p_36.jpg',1,0,1,'2019-02-20 18:58:49','2019-09-07 11:38:40'),(57,'05-057','AGUA CON GAS','AGUA CON GAS','','AGUA CON GAS',5,55.00,0.00,0.00,0.00,'p_39.jpg',1,0,1,'2019-02-20 18:59:38','2019-09-02 20:51:03'),(61,'05-061','JUGO ADES','JUGO ADES','','JUGO ADES',5,45.00,0.00,0.00,0.00,'p_3d.jpg',1,0,1,'2019-02-20 19:00:43','2019-09-02 20:51:13');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_discount`
--

DROP TABLE IF EXISTS `product_discount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `product_discount` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `discount_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_discount`
--

LOCK TABLES `product_discount` WRITE;
/*!40000 ALTER TABLE `product_discount` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_discount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `status_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'Activo','2017-10-03 20:55:57','2017-10-03 20:55:57'),(2,'Inactivo','2017-10-03 20:56:01','2017-10-03 20:56:01');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `totem`
--

DROP TABLE IF EXISTS `totem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `totem` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status_id` int(11) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `totem_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `totem`
--

LOCK TABLES `totem` WRITE;
/*!40000 ALTER TABLE `totem` DISABLE KEYS */;
INSERT INTO `totem` VALUES (1,'TOTEM01',1,'2019-03-01 21:25:00','2019-08-23 19:57:33');
/*!40000 ALTER TABLE `totem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT '',
  `status_id` int(11) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_user_name` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'omar','$2b$10$x54GfYXSWBxuRHwtgZfHo.TMnG78YoGgIiT1Go7Oq.e3rChhnTiLC','Omar Melendrez','',1,'2019-02-28 20:23:49','2019-02-28 20:42:23'),(3,'gustavo','$2b$10$xSqV1eZc9o0XQi5Lg4iQS.qXaCaiTifvJ0BhOQljksVNznGg1DpqK','Gustavo Buffo','',1,'2019-07-30 09:25:47','2019-07-30 09:25:47'),(4,'pamela','$2b$10$sMRETCjXFqSe1AuHSYq0v.YIbSo06Gky3nd4OTUGCedY4.UxVqUFS','Pamela Melinger','',1,'2019-07-30 09:36:54','2019-07-30 09:36:54'),(5,'alejandro','$2b$10$0qPsMvRlGF5ldJIGMWmpqemKk/DaLtKnPNxhJL4CPCZSATdS85PWe','Alejandro Valentini','',1,'2019-07-30 09:40:00','2019-07-30 09:40:00');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-02  0:00:01
