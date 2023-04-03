using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;

namespace ContactsAssignment
{
    [Route("api/[controller]")]
    [ApiController]
    public class AngularController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public AngularController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            string sqlDataSource = _configuration.GetConnectionString("dbCon");
            SqlDataReader dataReader;
            DataTable dt = new DataTable();
            using (SqlConnection conn = new SqlConnection(sqlDataSource))
            {
                conn.Open();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("sp_getcontacts", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader sdr = cmd.ExecuteReader();
                        dt.Load(sdr);
                        sdr.Close();
                        conn.Close();
                    }
                }
                catch (Exception ex)
                {
                    conn.Close();
                }
            }
            string res = JsonConvert.SerializeObject(dt);
            return Ok(res);
        }

        [HttpPost]
        public JsonResult Post([FromBody] Models contact)
        {
            string sqlDataSource = _configuration.GetConnectionString("dbCon");
            SqlDataReader dataReader;
            DataTable dt = new DataTable();
            using (SqlConnection conn = new SqlConnection(sqlDataSource))
            {
                conn.Open();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("sp_addupdatecontacts", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Id", contact.Id);
                        cmd.Parameters.AddWithValue("@FirstName", contact.FirstName);
                        cmd.Parameters.AddWithValue("@LastName", contact.LastName);
                        cmd.Parameters.AddWithValue("@Email", contact.Email);
                        cmd.Parameters.AddWithValue("@PhoneNumber", contact.PhoneNumber);
                        cmd.Parameters.AddWithValue("@Address", contact.Address);
                        cmd.Parameters.AddWithValue("@City", contact.City);
                        cmd.Parameters.AddWithValue("@State", contact.State);
                        cmd.Parameters.AddWithValue("@Country", contact.Country);
                        cmd.Parameters.AddWithValue("@PostalCode", contact.PostalCode);
                        SqlDataReader sdr = cmd.ExecuteReader();
                        dt.Load(sdr);
                        sdr.Close();
                        conn.Close();
                    }
                }
                catch (Exception ex)
                {
                    conn.Close();
                }
            }
            return new JsonResult("Added");
        }

        [HttpPut]
        public JsonResult Put([FromBody] Models contact)
        {
            string sqlDataSource = _configuration.GetConnectionString("dbCon");
            SqlDataReader dataReader;
            DataTable dt = new DataTable();
            using (SqlConnection conn = new SqlConnection(sqlDataSource))
            {
                conn.Open();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("sp_addupdatecontacts", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Id", contact.Id);
                        cmd.Parameters.AddWithValue("@FirstName", contact.FirstName);
                        cmd.Parameters.AddWithValue("@LastName", contact.LastName);
                        cmd.Parameters.AddWithValue("@Email", contact.Email);
                        cmd.Parameters.AddWithValue("@PhoneNumber", contact.PhoneNumber);
                        cmd.Parameters.AddWithValue("@Address", contact.Address);
                        cmd.Parameters.AddWithValue("@City", contact.City);
                        cmd.Parameters.AddWithValue("@State", contact.State);
                        cmd.Parameters.AddWithValue("@Country", contact.Country);
                        cmd.Parameters.AddWithValue("@PostalCode", contact.PostalCode);
                        SqlDataReader sdr = cmd.ExecuteReader();
                        dt.Load(sdr);
                        sdr.Close();
                        conn.Close();
                    }
                }
                catch (Exception ex)
                {
                    conn.Close();
                }
            }
            return new JsonResult("Updated");
        }
    }
}
