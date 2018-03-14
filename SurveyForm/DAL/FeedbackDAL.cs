using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using Model;

namespace DAL
{
    public class FeedbackDAL
    {
        /// <summary>
        /// to get all the users to populate training dropdown
        /// </summary>
        /// <returns>list of users,List<UserTable></returns>
        public List<User> GetAllUsers()
        {
            var users = new List<User>();
            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["TrainingDetails"].ConnectionString))
            {
                connection.Open();
                SqlCommand cmd = new SqlCommand("SELECT  [UserId],[UserName] FROM[Feedback].[dbo].[UserTable]", connection);
                SqlDataAdapter useradapter = new SqlDataAdapter(cmd);
                DataSet userdata = new DataSet();
                useradapter.Fill(userdata);
                foreach (DataRow datarow in userdata.Tables[0].Rows)
                {
                    users.Add(new User
                    {
                        UserId =(int)datarow.ItemArray[0],
                        UserName = datarow.ItemArray[1].ToString()

                    });
                }
                cmd.ExecuteNonQuery();
                return users;
            }
        }


        /// <summary>
        /// to insert training details into TrainingProgram table
        /// </summary>
        /// <param name="training"></param>
        public void InsertTraining(TrainingProgram training)
        {
            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["TrainingDetails"].ConnectionString))
            {
                SqlCommand cmd = new SqlCommand("INSERT INTO [dbo].[TrainingProgram] ([TrainingName] ,[Trainer],[Date],[Venue],[Attendees]) values(@trainingname,@trainer,@date,@venue,@attendees)", connection);
                cmd.Parameters.Add(new SqlParameter
                {
                    ParameterName = "@trainingname", //
                    Value = training.TrainingName
                });
                cmd.Parameters.Add(new SqlParameter
                {
                    ParameterName = "@trainer",
                    Value = training.Trainer
                });
                cmd.Parameters.Add(new SqlParameter
                {
                    ParameterName = "@date",
                    Value = training.Date
                });
                cmd.Parameters.Add(new SqlParameter
                {
                    ParameterName = "@venue",
                    Value = training.Venue
                });
                cmd.Parameters.Add(new SqlParameter
                {
                    ParameterName = "@attendees",
                    Value = training.Attendees
                });
                connection.Open();
                cmd.ExecuteNonQuery();
            }
        }


        /// <summary>
        /// fetching questions of particular section
        /// </summary>
        /// <param name="SectionId"></param>
        /// <returns> list of questions,List<Question></returns>
        public List<Question> GetQuestionsBySectionId(int SectionId)
        {
            var questions = new List<Question>();
            SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["TrainingDetails"].ConnectionString);
            SqlCommand cmd = new SqlCommand("SELECT [dbo].[Question].[QuestionID],[SectionID],[Description],[OptionGroupID] FROM [dbo].[QuestionOption] INNER JOIN [dbo].[Question] ON [dbo].[QuestionOption].[QuestionID] = [dbo].[Question].[QuestionID] where [SectionID] =@id  ", connection);
            cmd.Parameters.Add(new SqlParameter
            {
                ParameterName = "id",
                Value = SectionId
            });
            SqlDataAdapter userAdapter = new SqlDataAdapter(cmd);
            DataSet userdata = new DataSet();
            userAdapter.Fill(userdata);
            foreach (DataRow datarow in userdata.Tables[0].Rows)
            {
                questions.Add(new Question
                {
                    QuestionID = (int)datarow.ItemArray[0],
                    SectionID = (int)datarow.ItemArray[1],
                    Description = datarow.ItemArray[2].ToString(),
                    OptionGroupID = (int)datarow.ItemArray[3]
                });
            }
            return questions;
        }


        /// <summary>
        /// fetches training details to display
        /// </summary>
        /// <returns>list of trainingprograms,List<TrainingProgram></returns>
        public List<TrainingProgram> Training()
        {
            var training = new List<TrainingProgram>();
            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["TrainingDetails"].ConnectionString))
            {
                SqlCommand cmd = new SqlCommand("SELECT [TrainingID],[TrainingName] ,[Trainer],[Date],[Venue] FROM [dbo].[TrainingProgram] ", connection);
                SqlDataAdapter userAdapter = new SqlDataAdapter(cmd);
                DataSet userdata = new DataSet();
                userAdapter.Fill(userdata);
                foreach (DataRow datarow in userdata.Tables[0].Rows)
                {
                    training.Add(new TrainingProgram
                    {
                        TrainingID = (int)datarow.ItemArray[0],
                        TrainingName = datarow.ItemArray[1].ToString(),
                        Trainer = datarow.ItemArray[2].ToString(),
                        Date = Convert.ToDateTime(datarow["Date"]),
                        Venue = datarow.ItemArray[4].ToString()
                    });
                }
                connection.Open();
                cmd.ExecuteNonQuery();
                return training;
            }
        }


        /// <summary>
        /// fetches answers to display
        /// </summary>
        /// <param name="Trainingid"></param>
        /// <returns></returns>
        public List<Survey> GetAnswers(int Trainingid)
        {
            var answers = new List<Survey>();
            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["TrainingDetails"].ConnectionString))
            {
                connection.Open();
                SqlCommand cmd = new SqlCommand("SELECT [SurveyID] ,[Answers] ,[QuestionID],[TrainingID]  FROM [dbo].[Survey] WHERE [TrainingID]=@id", connection);
                SqlDataAdapter useradapter = new SqlDataAdapter(cmd);
                cmd.Parameters.Add(new SqlParameter
                {
                    ParameterName = "@id",
                    Value = Trainingid
                });
                DataSet userdata = new DataSet();
                useradapter.Fill(userdata);
                foreach (DataRow datarow in userdata.Tables[0].Rows)
                {
                    answers.Add(new Survey
                    {
                        SurveyID = (int)datarow.ItemArray[0],
                        Answers = datarow.ItemArray[1].ToString(),
                        QuestionID = (int)datarow.ItemArray[2],
                        TrainingID = (int)datarow.ItemArray[3]
                    });
                }
                cmd.ExecuteNonQuery();
                return answers;
            }
        }


        /// <summary>
        /// to insert answers into survey table of a particular survey 
        /// </summary>
        /// <param name="surveys"></param>
        public void Survey(Survey[] surveys)
        {
            foreach (var survey in surveys)
            {
                using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["TrainingDetails"].ConnectionString))
                {
                    SqlCommand cmd = new SqlCommand("INSERT INTO [dbo].[Survey] ([SurveyID],[Answers],[QuestionID],[TrainingID]) VALUES (@surveyid,@answer,@questionid,@trainingid)", connection);
                    cmd.Parameters.Add(new SqlParameter
                    {
                        ParameterName = "@surveyid",
                        Value = survey.SurveyID
                    });
                    cmd.Parameters.Add(new SqlParameter
                    {
                        ParameterName = "@answer",
                        Value = survey.Answers
                    });
                    cmd.Parameters.Add(new SqlParameter
                    {
                        ParameterName = "@questionid",
                        Value = survey.QuestionID
                    });
                    cmd.Parameters.Add(new SqlParameter
                    {
                        ParameterName = "@trainingid",
                        Value = survey.TrainingID
                    });
                    connection.Open();
                    cmd.ExecuteNonQuery();
                }
            }
        }


        /// <summary>
        /// to delete training from a training program based on the training id
        /// </summary>
        /// <param name="Trainingid"></param>
        public void DeleteTraining(int Trainingid)
        {
            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["TrainingDetails"].ConnectionString))
            {
                string que = "DELETE FROM [dbo].[TrainingProgram] WHERE [TrainingID] = @id";
                SqlCommand cmd = new SqlCommand(que, connection);
                cmd.Parameters.Add(new SqlParameter
                {
                    ParameterName = "@id",
                    Value = Trainingid
                });
                connection.Open();
                cmd.ExecuteNonQuery();
            }
        }


        /// <summary>
        /// to edit training from a training program based on the training id
        /// </summary>
        /// <param name="training"></param>
        public void EditTraining(TrainingProgram training)
        {
            using (SqlConnection conne = new SqlConnection(ConfigurationManager.ConnectionStrings["TrainingDetails"].ConnectionString))
            {
                string que = "UPDATE [dbo].[TrainingProgram] SET [TrainingName] = @tname, [Trainer] = @trainer, [Date] = @date,[Venue]=@venue WHERE [TrainingID] = @id";
                SqlCommand cmd = new SqlCommand(que, conne);
                conne.Open();
                cmd.Parameters.Add(new SqlParameter
                {
                    ParameterName = "@tname",
                    Value = training.TrainingName
                });
                cmd.Parameters.Add(new SqlParameter
                {
                    ParameterName = "@trainer",
                    Value = training.Trainer
                });
                cmd.Parameters.Add(new SqlParameter
                {
                    ParameterName = "@date",
                    Value = training.Date
                });
                cmd.Parameters.Add(new SqlParameter
                {
                    ParameterName = "@venue",
                    Value = training.Venue
                });
                cmd.Parameters.Add(new SqlParameter
                {
                    ParameterName = "@id",
                    Value = training.TrainingID
                });
                cmd.ExecuteNonQuery();
            }

        }

        
        public List<Admin> GetAdmin()
        {
            var user = new List<Admin>();
            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["TrainingDetails"].ConnectionString))
            {
                connection.Open();
                SqlCommand cmd = new SqlCommand("SELECT [UserName],[Password] FROM [Feedback].[dbo].[Admin] ", connection);
                SqlDataAdapter useradapter = new SqlDataAdapter(cmd);
                cmd.ExecuteNonQuery();
                DataSet userdata = new DataSet();
                useradapter.Fill(userdata);
                foreach (DataRow datarow in userdata.Tables[0].Rows)
                {
                    user.Add(new Admin
                    {
                        UserName= datarow.ItemArray[0].ToString(),
                        Password= datarow.ItemArray[1].ToString()
                    });
                }
                return user;
            }
        }
    }
}
