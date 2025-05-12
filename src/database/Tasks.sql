USE [STDev]
GO
/****** Object:  Table [todo].[Tasks]    Script Date: 12/05/2025  ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [todo].[Tasks](
	[IdTask] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](50) NULL,
	[Description] [nvarchar](max) NULL,
	[Completed] [bit] NULL,
	[CreationDate] [datetime] NULL,
	[updated_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[IdTask] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [todo].[Tasks] ADD  DEFAULT ((1)) FOR [Completed]
GO
ALTER TABLE [todo].[Tasks] ADD  DEFAULT (getdate()) FOR [CreationDate]
GO
