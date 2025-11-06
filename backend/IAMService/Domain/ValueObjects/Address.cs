using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ValueObjects
{
    public class Address
    {
        public int Number { get; private set; } = 0;
        public string Street { get; private set; } = string.Empty;
        public string District { get; private set; } = string.Empty;
        public string City { get; private set; } = string.Empty;
        public string Country { get; private set; } = string.Empty;
        private Address() { }

        public Address(int number = 0, string street = "",
            string district = "", string city = "", string country = "")
        {
            Number = number;
            Street = street;
            District = district;
            City = city;
            Country = country;
        }
    }
}
