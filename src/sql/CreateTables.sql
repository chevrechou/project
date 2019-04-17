USE events;
CREATE TABLE `action` (
  `ActionID` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Type` varchar(255) NOT NULL,
  `EventID` int(11) NOT NULL,
  `TimeStamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `user` (
  `UserID` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `AccessLevel` int(11) NOT NULL
);

CREATE TABLE `event` (
  `EventID` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Title` varchar(255) NOT NULL,
  `DateTime` varchar(255) NOT NULL,
  `Location` varchar(255) NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `AccessLevel` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
);

CREATE TABLE `favorites` (
  `userID` int(11) NOT NULL,
  `eventID` int(11) NOT NULL,
  FOREIGN KEY (`userID`) REFERENCES `user` (`UserID`),
  FOREIGN KEY (`eventID`) REFERENCES `event` (`EventID`) ON DELETE CASCADE
);

CREATE TABLE `tag` (
  `TagID` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `EventID` int(11) DEFAULT NULL,
  FOREIGN KEY (`EventID`) REFERENCES `event` (`EventID`) ON DELETE CASCADE
);