CREATE DATABASE [ContactsDB];
GO
USE [ContactsDB];

/****** Object:  Table [dbo].[tbl_Contacts]    Script Date: 02-04-2023 08:01:16 ******/

SET ANSI_NULLS ON;
GO
SET QUOTED_IDENTIFIER ON;
GO
CREATE TABLE [dbo].[tbl_Contacts]
([Id]          [INT] IDENTITY(1, 1) NOT NULL, 
 [FirstName]   [VARCHAR](MAX) NULL, 
 [LastName]    [VARCHAR](MAX) NULL, 
 [Email]       [VARCHAR](MAX) NULL, 
 [PhoneNumber] [BIGINT] NULL, 
 [Address]     [NVARCHAR](MAX) NULL, 
 [City]        [VARCHAR](MAX) NULL, 
 [State]       [VARCHAR](MAX) NULL, 
 [Country]     [VARCHAR](MAX) NULL, 
 [PostalCode]  [INT] NULL, 
 [CreatedOn]   [DATETIME] NULL, 
 CONSTRAINT [PK_tbl_Contatcs] PRIMARY KEY CLUSTERED([Id] ASC)
 WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
)
ON [PRIMARY] TEXTIMAGE_ON [PRIMARY];
GO
CREATE PROCEDURE sp_getcontacts
AS
    BEGIN
        SELECT Id, 
               FirstName, 
               LastName, 
               Email, 
               PhoneNumber, 
               [Address], 
               City, 
               [State], 
               Country, 
               PostalCode
        FROM tbl_Contacts
        ORDER BY CreatedOn DESC;
    END;
GO
CREATE PROCEDURE sp_addupdatecontacts
(@Id          INT, 
 @FirstName   VARCHAR(MAX), 
 @LastName    VARCHAR(MAX), 
 @Email       VARCHAR(MAX), 
 @PhoneNumber INT, 
 @Address     VARCHAR(MAX), 
 @City        VARCHAR(MAX), 
 @State       VARCHAR(MAX), 
 @Country     VARCHAR(MAX), 
 @PostalCode  INT
)
AS
    BEGIN
        IF(@Id = 0)
            BEGIN
                INSERT INTO tbl_Contacts
                VALUES
                (@FirstName, 
                 @LastName, 
                 @Email, 
                 @PhoneNumber, 
                 @Address, 
                 @City, 
                 @State, 
                 @Country, 
                 @PostalCode, 
                 GETDATE()
                );
            END;
            ELSE
            BEGIN
                UPDATE tbl_Contacts
                  SET 
                      FirstName = @FirstName, 
                      LastName = @LastName, 
                      Email = @Email, 
                      PhoneNumber = @PhoneNumber, 
                      [Address] = @Address, 
                      City = @City, 
                      [State] = @State, 
                      Country = @Country, 
                      PostalCode = @PostalCode, 
                      CreatedOn = GETDATE()
                WHERE Id = @Id;
            END;
    END;