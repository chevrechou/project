USE events;
CREATE TABLE `action` (
  `ActionID` int(11) NOT NULL AUTO_INCREMENT,
  `Type` varchar(255) NOT NULL,
  `EventID` int(11) NOT NULL,
  `TimeStamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ActionID`),
  KEY `action_ibfk_1` (`EventID`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `event` (
  `EventID` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(255) NOT NULL,
  `DateTime` varchar(255) NOT NULL,
  `Location` varchar(255) NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `AccessLevel` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  PRIMARY KEY (`EventID`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `event_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `favorites` (
  `userID` int(11) NOT NULL,
  `eventID` int(11) NOT NULL,
  KEY `userID` (`userID`),
  KEY `eventID` (`eventID`),
  CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`UserID`),
  CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`eventID`) REFERENCES `event` (`EventID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `tag` (
  `TagID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `EventID` int(11) DEFAULT NULL,
  PRIMARY KEY (`TagID`),
  KEY `EventID` (`EventID`),
  CONSTRAINT `tag_ibfk_1` FOREIGN KEY (`EventID`) REFERENCES `event` (`EventID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `user` (
  `UserID` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `AccessLevel` int(11) NOT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;