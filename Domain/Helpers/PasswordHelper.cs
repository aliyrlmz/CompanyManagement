
using System.Security.Cryptography;

namespace Domain
{
    public static class PasswordHelper
    {
        const int keySize = 64;
        const int iterations = 350000;
        static HashAlgorithmName hashAlgorithm = HashAlgorithmName.SHA512;
        public static string HashPasword(string password, out byte[] salt)
        {
            salt = RandomNumberGenerator.GetBytes(keySize);
            var hash = Rfc2898DeriveBytes.Pbkdf2(
                System.Text.Encoding.UTF8.GetBytes(password),
                salt,
                iterations,
                hashAlgorithm,
                keySize);
            return Convert.ToHexString(hash);
        }

        //this is not working cause checkpassword returns false everytime...
        public static bool CheckPassword(string password, string salt, string hash)
        {
            var h = Rfc2898DeriveBytes.Pbkdf2(
                System.Text.Encoding.UTF8.GetBytes(password),
                System.Text.Encoding.UTF8.GetBytes(salt),
                iterations,
                hashAlgorithm,
                keySize);
            var g = Convert.ToHexString(h);

            if (g == hash)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

    }
}