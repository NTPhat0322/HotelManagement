
namespace Domain.ValueObjects
{
    public class Address
    {
        public string DetailAddress { get; private set; } = string.Empty;
        public string Ward { get; private set; } = string.Empty;
        public string District { get; private set; } = string.Empty;
        public string City { get; private set; } = string.Empty;
        private Address() { }

        public Address(string detailAddress = "", string ward = "",
            string district = "", string city = "")
        {
            DetailAddress = detailAddress;
            Ward = ward;
            District = district;
            City = city;

        }
        //detail address setter
        public void SetDetailAddress(string detailAddress)
        {
            DetailAddress = detailAddress;
        }
        //ward setter
        public void SetWard(string ward)
        {
            Ward = ward;
        }
        //district setter
        public void SetDistrict(string district)
        {
            District = district;
        }
        public void SetCity(string city)
        {
            City = city;
        }
    }
}
