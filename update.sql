
--
-- Table structure for table `advertising`
--

DROP TABLE IF EXISTS `advertising`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `advertising` (
  `idadvertising` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idadvertising`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `advertising`
--

LOCK TABLES `advertising` WRITE;
/*!40000 ALTER TABLE `advertising` DISABLE KEYS */;
INSERT INTO `advertising` VALUES (32,'פרסומת-אולפן.png'),(33,'פרסומת-הקלטה-באולפן.png'),(34,'פרסומת-מכירת-דיסקים.png'),(35,'פרסומת-כלי-נגינה.png');
/*!40000 ALTER TABLE `advertising` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `idtasks` int NOT NULL AUTO_INCREMENT,
  `content` varchar(45) DEFAULT NULL,
  `date` varchar(45) DEFAULT NULL,
  `iduser` int DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idtasks`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (1,'לשטוף כלים','2024-11-5',1,'success'),(2,'ככככדד','2024-10-12',1,'success'),(3,'דדדד','2024-10-12',1,'success'),(17,NULL,'2024-11-5',NULL,NULL),(18,NULL,'2024-11-5',NULL,NULL),(19,'','2024-11-19T22:00:00.000Z',1,'error'),(20,'vhhhh','2024-11-03T22:00:00.000Z',1,'error'),(21,'','4',1,''),(22,'ddddd','2024-11-03T22:00:00.000Z',1,'warning'),(23,'ddddd','2024-11-04T22:00:00.000Z',1,'success'),(24,'kkkk','2024-11-05T22:00:00.000Z',1,'success'),(25,'היי','2024-11-06T22:00:00.000Z',1,'error'),(26,'היי','2024-11-06T22:00:00.000Z',1,'warning'),(27,'היי','2024-11-06T22:00:00.000Z',1,'success');
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;
