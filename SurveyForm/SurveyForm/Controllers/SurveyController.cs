using DAL;
using Model;
using System.Collections.Generic;
using System.Web.Http;

namespace SurveyForm.Controllers
{
    public class SurveyController : ApiController
    {
        FeedbackDAL feedback = new FeedbackDAL();

        /// <summary>
        /// to get all the users to populate training dropdown
        /// </summary>
        /// <returns>list of users,List<UserTable></returns>
        [HttpGet]
        public List<User> GetAllUsers()
        {
            List<User> lists = new List<User>();
            lists = feedback.GetAllUsers();
            return lists;
        }


        /// <summary>
        /// fetching questions of particular section
        /// </summary>
        /// <param name="Sectionid"></param>
        /// <returns> list of questions,List<Question></returns>
        [HttpGet]
        public List<Question> GetQuestions(int Sectionid)
        {
            List<Question> questions = feedback.GetQuestionsBySectionId(Sectionid);
            return questions;
        }


        /// <summary>
        /// to fetch the feedback to display
        /// </summary>
        /// <param name="Trainingid"></param>
        /// <returns></returns>
        [HttpGet]
        public List<Survey> GetFeedback(int Trainingid)
        {
            List<Survey> values = feedback.GetAnswers(Trainingid);
            return values;
        }


        /// <summary>
        /// fetches training details to display
        /// </summary>
        /// <returns>list of trainingprograms,List<TrainingProgram></returns>
        [HttpGet]
        public List<TrainingProgram> GetTraining()
        {
            List<TrainingProgram> training = feedback.Training();
            return training;
        }


        /// <summary>
        /// to insert answers into survey table of a particular survey 
        /// </summary>
        /// <param name="surveys"></param>
        [HttpPost]
        public void InsertSurvey([FromBody]Survey[] survey)
        {
            feedback.Survey(survey);
        }


        /// <summary>
        /// to insert training details into TrainingProgram table
        /// </summary>
        /// <param name="training"></param>
        [HttpPost]
        public void InsertTraining(TrainingProgram train)
        {
            feedback.InsertTraining(train);
        }


        /// <summary>
        /// to delete training from a training program based on the training id
        /// </summary>
        /// <param name="TrainingID"></param>
        // [Route("api/Survey/{trainingId}")]
        [HttpDelete]
        public void DeleteTraining(int Id)
        {
            feedback.DeleteTraining(Id);
        }


        /// <summary>
        /// to edit training from a training program based on the training id
        /// </summary>
        /// <param name="training"></param>
        [HttpPut]
        public void Edittraining(TrainingProgram training)
        {
            feedback.EditTraining(training);
        }

        [HttpGet]
        public List<Admin> GetAdmin()
        {
            List<Admin> user= feedback.GetAdmin();
            return user;
        }
    }
}

