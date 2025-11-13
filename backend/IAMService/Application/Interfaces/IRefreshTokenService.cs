using Application.DTOs.Requests;
using Application.DTOs.Responses;
using Application.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IRefreshTokenService
    {
        Task<GenericResult<RefreshTokenResponse>> RefreshTokenAsync(RefreshTokenRequest request);
    }
}
