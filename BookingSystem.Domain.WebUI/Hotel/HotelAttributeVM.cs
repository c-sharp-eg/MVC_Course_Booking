﻿namespace BookingSystem.Domain.WebUI.Hotel
{
    public class HotelAttributeVM
    {
        public int HotelId { get; set; }

        public int AttributeId { get; set; }

        public bool IsActive { get; set; }

        public bool IsDeleted { get; set; }
    }
}